"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ExternalLink } from "lucide-react";
import { FaHeart } from "react-icons/fa6";

export type GreenBean = {
  id: string;
  vendorName: string;
  name: string;
  unit: string;
  priceKrw: number;
  productUrl: string;
  productNo: string;
  origin: string;
  status: string;
};

const FAVORITE_KEY = "favorite-bean";

export const columns: ColumnDef<GreenBean>[] = [
  {
    accessorKey: "vendorName",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-gray-500 hover:bg-muted/0 cursor-pointer"
          >
            Vendor
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return <p className="text-center truncate">{row.original.vendorName}</p>;
    },
    filterFn: (row, columnId, filterValue: string[]) => {
      if (!filterValue?.length) return true;

      const value = row.getValue(columnId) as string;
      return filterValue.includes(value);
    },
    size: 100,
  },
  {
    accessorKey: "origin",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-gray-500 hover:bg-muted/0 cursor-pointer"
          >
            Origin
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return <p className="text-center truncate">{row.original.origin}</p>;
    },
    filterFn: (row, columnId, filterValue: string[]) => {
      if (!filterValue?.length) return true;

      const value = row.getValue(columnId) as string;
      return filterValue.includes(value);
    },
    size: 100,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-gray-500 hover:bg-muted/0 cursor-pointer"
        >
          Name
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <p className="font-semibold truncate">{row.original.name}</p>;
    },
    size: 400,
  },
  {
    accessorKey: "unit",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-gray-500 hover:bg-muted/0 cursor-pointer"
          >
            Unit
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return <p className="text-center truncate">{row.original.unit}</p>;
    },
    size: 100,
  },
  {
    accessorKey: "priceKrw",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-gray-500 hover:bg-muted/0 cursor-pointer"
          >
            Price
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const price = row.original.priceKrw;

      return (
        <p className="font-semibold text-center">
          {price ? `${price.toLocaleString()}원` : "-"}
        </p>
      );
    },
    size: 100,
  },
  {
    accessorKey: "productUrl",
    header: ({ column }) => {
      return <p className="text-center">Buy</p>;
    },
    cell: ({ row }) => {
      const url = row.original.productUrl;

      if (!url) return "-";

      return (
        <div className="text-center">
          <Button
            asChild
            size="sm"
            variant="outline"
            className="bg-accent text-white border-0 hover:bg-accent/80 hover:text-muted"
          >
            <a href={url} target="_blank">
              구매
              <ExternalLink className="ml-1 size-3" />
            </a>
          </Button>
        </div>
      );
    },
    size: 100,
  },
  {
    accessorKey: "status",
    header: "상태",
    filterFn: (row, columnId, filterValue: string[]) => {
      if (!filterValue?.length) return true;

      const value = row.getValue(columnId) as string;
      return filterValue.includes(value);
    },
  },
  {
    accessorKey: "favorite",
    header: ({ column }) => {
      return <p className="text-center">찜하기</p>;
    },
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div
          className="text-center cursor-pointer"
          onClick={() => {
            // 로컬 스토리지에 저장된 값
            const store = localStorage.getItem(FAVORITE_KEY);
            const basket = store ? JSON.parse(store) : [];

            // 중복 방지
            if (
              basket?.some(
                (item: { productNo: string }) =>
                  item.productNo === data.productNo,
              )
            ) {
              return;
            }

            // 값 쌓아서 저장
            const newItem = [...basket, data];
            localStorage.setItem(FAVORITE_KEY, JSON.stringify(newItem));
          }}
        >
          <FaHeart className="w-full text-[1rem]" />
        </div>
      );
    },
    size: 70,
  },
];
