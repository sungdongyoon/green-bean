import greenbeanData from "@/public/data/green-bean-vendors.json";
import { create } from "zustand";

type Vendor = (typeof greenbeanData.vendors)[number];
type Product = Vendor["products"][number];

export type GreenBean = Product & {
  vendorName: string;
  vendorKey: string;
};

interface GreenBeanState {
  data: GreenBean[];
  originData: typeof greenbeanData;
}

const data: GreenBean[] = greenbeanData.vendors.flatMap((vendor) =>
  vendor.products.map((product) => ({
    ...product,
    vendorName: vendor.name,
    vendorKey: vendor.key,
  })),
);

export const useGreenBeanStore = create<GreenBeanState>(() => ({
  data,
  originData: greenbeanData,
}));
