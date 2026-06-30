"use client";

import greenbeanData from "@/public/data/green-bean-vendors.json";

import { Suspense } from "react";
import { DataTable } from "../components/home/DataTable";
import { getColumns } from "./colums";
import { useTranslations } from "next-intl";

const Home = () => {
  // const greenbeanData = await apiGetGreenbeanData();

  const data = greenbeanData.vendors.flatMap((vendor: any) =>
    vendor.products.map((product: any) => ({
      ...product,
      vendorName: vendor.name,
      vendorKey: vendor.key,
    })),
  );

  // 다국어
  const homeLang = useTranslations("Home");
  const tableLang = useTranslations("Table");

  return (
    <section className="section">
      <h1 className="section-title">{homeLang("title")}</h1>
      <Suspense fallback={null}>
        <DataTable
          columns={getColumns("favorite", tableLang)}
          data={data}
          originData={greenbeanData}
        />
      </Suspense>
    </section>
  );
};

export default Home;
