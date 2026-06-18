"use client";

import { ColumnDef } from "@tanstack/react-table";
import React from "react";

export type GreenBean = {
  id: string;
  vendorName: string;
  name: string;
  unit: string;
  priceKrw: number;
};

export const columns: ColumnDef<GreenBean>[] = [
  {
    accessorKey: "vendorName",
    header: "Vendor",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "unit",
    header: "Unit",
  },
  {
    accessorKey: "priceKrw",
    header: "Price",
  },
];
