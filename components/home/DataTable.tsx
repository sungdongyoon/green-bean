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
import { useTranslations } from "next-intl";
import { FaSearch } from "react-icons/fa";

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

  // 다국어
  const vendorLang = useTranslations("Vendor");
  const originLang = useTranslations("Origin");
  const homeLang = useTranslations("Home");

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
      columnVisibility: {
        status: false,
      },
    },
  });

  // 판매사 리스트(오름차순)
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

  // 검색 키워드 동작
  useEffect(() => {
    table.getColumn("name")?.setFilterValue(keyword || undefined);
  }, [keyword, table]);

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
        <FieldGroup className="flex md:hidden border border-gray-2 p-3 rounded-md pb-5 md:pb-3">
          <FieldLegend className="text-[0.8rem] text-gray-8 font-semibold mb-0 flex items-center gap-2">
            <Button
              size="icon-xs"
              variant="outline"
              className="border-gray-2 bg-accent-foreground"
            >
              <FaSearch className="text-primary" />
            </Button>
            {homeLang("search")}
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
        <FieldGroup className="border border-gray-2 p-3 rounded-md">
          <FieldLegend className="text-[0.8rem] text-gray-8 font-semibold mb-0 flex items-center gap-2">
            <Button
              size="icon-xs"
              variant="outline"
              className="border-gray-2 bg-accent-foreground"
            >
              <FaShop className="text-primary" />
            </Button>
            {vendorLang("title")}
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
                  className="data-checked:bg-black data-checked:text-white data-checked:border-0"
                />
                <FieldLabel htmlFor={vendor} className="text-[0.8rem]">
                  {vendorLang(vendor)}
                </FieldLabel>
              </Field>
            ))}
          </div>
        </FieldGroup>
        <FieldGroup className="lg:col-span-3 border border-gray-2 p-3 rounded-md">
          <FieldLegend className="text-[0.8rem] text-gray-8 font-semibold mb-0 flex items-center gap-2">
            <Button
              size="icon-xs"
              variant="outline"
              className="border-gray-2 bg-accent-foreground"
            >
              <FaMapLocation className="text-primary" />
            </Button>
            {originLang("title")}
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
                  className="data-checked:bg-black data-checked:text-white data-checked:border-0"
                />

                <FieldLabel
                  htmlFor={origin.originKey}
                  className="text-[0.8rem]"
                >
                  {originLang(origin.originKey)}
                </FieldLabel>
              </Field>
            ))}
          </div>
        </FieldGroup>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
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
            className="data-checked:bg-black data-checked:text-white data-checked:border-0"
          />
          <label htmlFor="status" className="text-xs font-medium">
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
    </div>
  );
}
