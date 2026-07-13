"use client";

import FavoriteDeleteButton from "@/components/favorites/FavoriteDeleteButton";
import FavoriteButton from "@/components/home/FavoriteButton";
import { Button } from "@/components/ui/button";
import { GreenBeanData } from "@/store/useGreenBeanStore";
import { ActionColumn, GreenBean } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";

type TFunction = ReturnType<typeof useTranslations>;

// 액션 컬럼 함수(삭제, 찜하기 컬럼)
function getActionColumn(
  col: ActionColumn,
  t: TFunction,
): ColumnDef<GreenBeanData> {
  if (col === "delete") {
    return {
      id: "delete",
      header: () => <p className="text-center">{t("delete")}</p>,
      cell: ({ row }) => {
        return <FavoriteDeleteButton beanData={row.original} />;
      },
      size: 70,
    };
  }

  return {
    id: "favorite",
    header: () => <p className="text-center">{t("favorite")}</p>,
    cell: ({ row }) => {
      return <FavoriteButton beanData={row.original} />;
    },
    size: 70,
  };
}

export const getColumns = (
  col: ActionColumn,
  t: TFunction,
): ColumnDef<GreenBeanData>[] => [
  {
    accessorKey: "vendorName",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-gray-7 hover:bg-muted/0 cursor-pointer"
          >
            {t("vendor")}
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
            className="text-gray-7 hover:bg-muted/0 cursor-pointer"
          >
            {t("origin")}
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
          className="text-gray-7 hover:bg-muted/0 cursor-pointer"
        >
          {t("name")}
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
            className="text-gray-7 hover:bg-muted/0 cursor-pointer"
          >
            {t("unit")}
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
            className="text-gray-7 hover:bg-muted/0 cursor-pointer"
          >
            {t("price")}
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
      return <p className="text-center">{t("buy")}</p>;
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
            className="bg-secondary text-white border-0 hover:bg-primary hover:text-white"
          >
            <a href={url} target="_blank">
              {t("buy")}
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
  getActionColumn(col, t),
];
