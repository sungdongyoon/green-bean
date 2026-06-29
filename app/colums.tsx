"use client";

import { Button } from "@/components/ui/button";
import { GreenBean } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ExternalLink } from "lucide-react";
import { FaHeart, FaTrash } from "react-icons/fa6";

const FAVORITE_KEY = "favorite-bean";

type ActionColumn = "favorite" | "delete";

function getActionColumn(mode: ActionColumn): ColumnDef<GreenBean> {
  if (mode === "delete") {
    return {
      id: "delete",
      header: () => <p className="text-center">삭제</p>,
      cell: ({ row }) => {
        const data = row.original;

        return (
          <button
            type="button"
            className="flex w-full justify-center cursor-pointer"
            onClick={() => {
              const store = localStorage.getItem(FAVORITE_KEY);
              const basket: GreenBean[] = store ? JSON.parse(store) : [];

              const nextBasket = basket.filter(
                (item) => item.productNo !== data.productNo,
              );

              localStorage.setItem(FAVORITE_KEY, JSON.stringify(nextBasket));

              window.dispatchEvent(new Event("favorite-bean-change"));
            }}
          >
            <FaTrash className="size-4 text-red-500" />
          </button>
        );
      },
      size: 70,
    };
  }

  return {
    id: "favorite",
    header: () => <p className="text-center">찜하기</p>,
    cell: ({ row }) => {
      const data = row.original;

      return (
        <button
          type="button"
          className="flex w-full justify-center cursor-pointer"
          onClick={() => {
            const store = localStorage.getItem(FAVORITE_KEY);
            const basket: GreenBean[] = store ? JSON.parse(store) : [];

            const isAlreadyFavorite = basket.some(
              (item) => item.productNo === data.productNo,
            );

            if (isAlreadyFavorite) return;

            const nextBasket = [...basket, data];

            localStorage.setItem(FAVORITE_KEY, JSON.stringify(nextBasket));

            window.dispatchEvent(new Event("favorite-bean-change"));
          }}
        >
          <FaHeart className="text-[1rem]" />
        </button>
      );
    },
    size: 70,
  };
}

export const getColumns = (col: ActionColumn): ColumnDef<GreenBean>[] => [
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
  getActionColumn(col),
];
