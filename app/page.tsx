import { apiGetGreenbeanData } from "@/utils/greenbean/utils";
import { DataTable } from "./dataTable";
import { columns } from "./colums";

const Home = async () => {
  const greenbeanData = await apiGetGreenbeanData();

  const data = greenbeanData.vendors.flatMap((vendor: any) =>
    vendor.products.map((product: any) => ({
      ...product,
      vendorName: vendor.name,
      vendorKey: vendor.key,
    })),
  );

  return (
    <div className="w-full flex justify-center p-3">
      <div className="max-w-7xl w-full flex flex-col justify-center">
        <DataTable columns={columns} data={data} originData={greenbeanData} />
      </div>
    </div>
  );
};

export default Home;
