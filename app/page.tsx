import greenbeanData from "@/public/data/green-bean-vendors.json";
import { DataTable } from "./dataTable";
import { columns } from "./colums";
import { Suspense } from "react";

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
    <div className="w-full flex justify-center p-6 md:p-12">
      <div className="max-w-7xl w-full flex flex-col justify-center">
        <Suspense fallback={null}>
          <DataTable columns={columns} data={data} originData={greenbeanData} />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
