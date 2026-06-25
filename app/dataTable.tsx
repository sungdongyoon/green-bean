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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { Suspense, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
} from "@/components/ui/field";
import { ORIGIN_LIST } from "@/constants/originList";
import { FaMapLocation, FaShop } from "react-icons/fa6";
import { useSearchParams } from "next/navigation";
import TablePagination from "@/components/common/TablePagination";
import HeaderSearch from "@/components/common/HeaderSearch";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  originData: {
    vendors: { name: string }[];
  };
}

export function DataTable<TData, TValue>({
  columns,
  data,
  originData,
}: DataTableProps<TData, TValue>) {
  // 정렬
  const [sorting, setSorting] = useState<SortingState>([]);
  // 필터
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // 헤더 검색 input값
  const params = useSearchParams();
  const keyword = params.get("keyword") ?? "";

  const table = useReactTable({
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
    },
  });

  // 판매사 리스트(오름차순))
  const vendors = originData.vendors
    .map((vendor: { name: string }) => vendor.name)
    .sort((a, b) => (a.toLowerCase() < b.toLowerCase() ? -1 : 1));

  const selectedVendors =
    (table.getColumn("vendorName")?.getFilterValue() as string[]) ?? [];

  // 국가 리스트 정렬(오름차순)
  const sortedOriginList = [...ORIGIN_LIST].sort((a, b) =>
    a.originName.toLowerCase() < b.originName.toLowerCase() ? -1 : 1,
  );

  const selectedOrigin =
    (table.getColumn("origin")?.getFilterValue() as string[]) ?? [];

  console.log("origin", selectedOrigin);

  // 검색 키워드 동작
  useEffect(() => {
    table.getColumn("name")?.setFilterValue(keyword || undefined);
  }, [keyword, table]);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-[1.4rem] font-semibold">생두 상세검색</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 my-4">
        <FieldGroup className="flex md:hidden bg-white border border-gray-200 p-3 rounded-md pb-5 md:pb-3">
          <FieldLegend className="text-[0.8rem] text-gray-400 font-semibold mb-0 flex items-center gap-2">
            <Button size="icon-xs" variant="outline">
              <FaShop className="text-accent" />
            </Button>
            생두 검색
          </FieldLegend>
          <HeaderSearch className="w-full" />
          {/* <Input
            id="search"
            placeholder="생두명을 입력해주세요."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="w-full bg-white"
          /> */}
        </FieldGroup>
        <FieldGroup className="bg-white border border-gray-200 p-3 rounded-md">
          <FieldLegend className="text-[0.8rem] text-gray-400 font-semibold mb-0 flex items-center gap-2">
            <Button size="icon-xs" variant="outline">
              <FaShop className="text-accent" />
            </Button>
            판매사
          </FieldLegend>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-2 gap-3">
            {vendors.map((vendor) => (
              <Field orientation="horizontal" key={vendor}>
                <Checkbox
                  id={vendor}
                  checked={(
                    (table
                      .getColumn("vendorName")
                      ?.getFilterValue() as string[]) ?? []
                  ).includes(vendor)}
                  onCheckedChange={(checked) => {
                    const next = checked
                      ? [...selectedVendors, vendor]
                      : selectedVendors.filter((v) => v !== vendor);

                    table
                      .getColumn("vendorName")
                      ?.setFilterValue(next.length ? next : undefined);
                  }}
                  className="bg-white data-checked:bg-black data-checked:text-white data-checked:border-0"
                />
                <FieldLabel htmlFor={vendor} className="text-[0.8rem]">
                  {vendor}
                </FieldLabel>
              </Field>
            ))}
          </div>
        </FieldGroup>
        <FieldGroup className="lg:col-span-3 bg-white border border-gray-200 p-3 rounded-md">
          <FieldLegend className="text-[0.8rem] text-gray-400 font-semibold mb-0 flex items-center gap-2">
            <Button size="icon-xs" variant="outline">
              <FaMapLocation className="text-accent" />
            </Button>
            국가
          </FieldLegend>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
            {sortedOriginList.map((origin) => (
              <Field orientation="horizontal" key={origin.originKey}>
                <Checkbox
                  id={origin.originKey}
                  checked={
                    (
                      (table
                        .getColumn("origin")
                        ?.getFilterValue() as string[]) ?? []
                    ).includes(origin.originName)
                    // table.getColumn("origin")?.getFilterValue() ===
                    // origin.originName
                  }
                  onCheckedChange={(checked) => {
                    const next = checked
                      ? [...selectedOrigin, origin.originName]
                      : selectedOrigin.filter((v) => v !== origin.originName);

                    table
                      .getColumn("origin")
                      ?.setFilterValue(next.length ? next : undefined);
                  }}
                  className="bg-white data-checked:bg-black data-checked:text-white data-checked:border-0"
                />

                <FieldLabel
                  htmlFor={origin.originKey}
                  className="text-[0.8rem]"
                >
                  {origin.originName}
                </FieldLabel>
              </Field>
            ))}
          </div>
        </FieldGroup>
      </div>
      <div className="flex items-center space-x-2 mb-3">
        <p className="text-sm font-medium">Rows per page</p>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-[70px] bg-white">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 25, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table className="bg-white table-fixed w-full">
          <TableHeader className="bg-gray-100">
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
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center space-x-2 py-4">
        <TablePagination table={table} />
      </div>
    </>
  );
}
