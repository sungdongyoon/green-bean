import greenbeanData from "@/public/data/green-bean-vendors.json";

import { columns } from "./colums";
import { Suspense } from "react";
import { DataTable } from "../components/home/DataTable";

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
        <DataTable columns={columns} data={data} originData={greenbeanData} />
      </Suspense>
    </section>
  );
};

export default Home;
