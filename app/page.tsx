"use client";

import greenbeanData from "@/public/data/green-bean-vendors.json";

import { Suspense } from "react";
import { DataTable } from "../components/home/DataTable";
import { getColumns } from "./colums";

const Home = () => {
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
      <h1 className="section-title">생두 상세검색</h1>
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
