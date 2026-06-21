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
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
} from "@/components/ui/field";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  originData: {
    vendors: [];
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
  // 체크
  const [checked, setChecked] = useState<boolean>(false);

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

  // 판매사 리스트
  const vendros = originData.vendors.map(
    (vendor: { name: string }) => vendor.name,
  );

  console.log("test", originData);

  return (
    <>
      <div className="flex items-center py-4">
        <Input
          placeholder="원두명을 입력해주세요."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <FieldGroup className="mx-auto w-56">
          <FieldLegend>판매사</FieldLegend>
          {vendros.map((vendor) => (
            <Field orientation="horizontal" key={vendor}>
              <Checkbox
                id={vendor}
                checked={
                  table.getColumn("vendorName")?.getFilterValue() === vendor
                }
                onCheckedChange={(checked) => {
                  table
                    .getColumn("vendorName")
                    ?.setFilterValue(checked ? vendor : undefined);
                }}
              />

              <FieldLabel htmlFor={vendor}>{vendor}</FieldLabel>
            </Field>
          ))}
        </FieldGroup>
        <FieldGroup className="mx-auto w-56">
          <FieldLegend>국가</FieldLegend>
          {vendros.map((vendor) => (
            <Field orientation="horizontal" key={vendor}>
              <Checkbox
                id={vendor}
                checked={
                  table.getColumn("vendorName")?.getFilterValue() === vendor
                }
                onCheckedChange={(checked) => {
                  table
                    .getColumn("vendorName")
                    ?.setFilterValue(checked ? vendor : undefined);
                }}
              />

              <FieldLabel htmlFor={vendor}>{vendor}</FieldLabel>
            </Field>
          ))}
        </FieldGroup>
      </div>
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Rows per page</p>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
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
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          이전
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          다음
        </Button>
      </div>
      {/* <DataTablePagination table={table} /> */}
    </>
  );
}
