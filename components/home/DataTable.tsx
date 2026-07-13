"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { FaRotate } from "react-icons/fa6";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import TablePagination from "@/components/common/TablePagination";
import { useTranslations } from "next-intl";
import { GreenBeanData, useGreenBeanStore } from "@/store/useGreenBeanStore";
import BeanFilter from "./BeanFilter";
import { FilterSheet } from "../common/FilterSheet";
import { useIsMobile } from "@/hooks/use-mobile";

interface DataTableProps {
  columns: ColumnDef<GreenBeanData, unknown>[];
  data: GreenBeanData[];
  originData: {
    vendors: { name: string }[];
  };
}

export function DataTable({ columns }: DataTableProps) {
  // 생두 데이터
  const data = useGreenBeanStore((state) => state.data);

  // 정렬
  const [sorting, setSorting] = useState<SortingState>([]);
  // 필터
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // 모바일 환경 구분
  const isMobile = useIsMobile();

  // 헤더 검색 input값
  const params = useSearchParams();
  const keyword = params.get("keyword") ?? "";

  const router = useRouter();
  const pathname = usePathname();

  // 다국어
  const homeLang = useTranslations("Home");
  const tableLang = useTranslations("Table");

  const table = useReactTable<GreenBeanData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility: {
        status: false,
      },
    },
  });

  // 검색 필터 초기화
  const handleResetFilter = () => {
    setColumnFilters([]);
    router.replace(pathname);
  };

  // 검색 키워드 동작
  useEffect(() => {
    table.getColumn("name")?.setFilterValue(keyword || undefined);
  }, [keyword, table]);

  return (
    <div className="flex flex-col gap-3">
      {isMobile ? <FilterSheet table={table} /> : <BeanFilter table={table} />}
      <div className="flex justify-between flex-wrap gap-3">
        <div className="flex items-center flex-wrap gap-3">
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>

            <SelectContent side="top" className="">
              <SelectGroup className="**:data-[slot=select-item]:focus:bg-secondary">
                {[10, 20, 25, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <p className="text-sm font-regular">{homeLang("perPage")}</p>
          <Button size="sm" onClick={handleResetFilter}>
            {homeLang("resetFilter")}
            <FaRotate className="ml-1" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="status"
            checked={
              table.getColumn("status")?.getFilterValue() === "available"
            }
            onCheckedChange={(checked) => {
              table
                .getColumn("status")
                ?.setFilterValue(checked ? "available" : undefined);
            }}
            className="data-checked:bg-black data-checked:text-white data-checked:border-0 cursor-pointer"
          />
          <label
            htmlFor="status"
            className="text-xs font-medium cursor-pointer"
          >
            {homeLang("statusOk")}
          </label>
        </div>
      </div>
      <div className="overflow-hidden rounded-md border border-gray-2">
        <Table className="table-fixed w-full">
          <TableHeader className="bg-gray-3">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-muted/0">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-muted/0"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-[0.8rem]">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length - 1}
                  className="h-24 text-center"
                >
                  {tableLang("noResult")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center space-x-2 py-4">
        <TablePagination table={table} />
      </div>
    </div>
  );
}
