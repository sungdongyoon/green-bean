"use client";

import greenbeanData from "@/public/data/green-bean-vendors.json";

import { Suspense } from "react";
import { DataTable } from "../components/home/DataTable";
import { getColumns } from "./colums";

const Home = async () => {
  // const greenbeanData = await apiGetGreenbeanData();

  const data = greenbeanData.vendors.flatMap((vendor: any) =>
    vendor.products.map((product: any) => ({
      ...product,
      vendorName: vendor.name,
      vendorKey: vendor.key,
    })),
  );

  return (
    <section className="section">
      <Suspense fallback={null}>
        <DataTable
          columns={getColumns("favorite")}
          data={data}
          originData={greenbeanData}
        />
      </Suspense>
    </section>
  );
};

export default Home;
