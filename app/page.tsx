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

  console.log("green", data);

  return (
    <div className="w-full p-3">
      <div className="p-2 flex flex-col gap-1">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Home;
