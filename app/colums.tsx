"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ExternalLink } from "lucide-react";

export type GreenBean = {
  id: string;
  vendorName: string;
  name: string;
  unit: string;
  priceKrw: number;
  productUrl: string;
  origin: string;
};

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
];
