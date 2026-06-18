import { apiGetGreenbeanData } from "@/utils/greenbean/utils";
import { DataTable } from "./dataTable";
import { columns } from "./colums";
import { DataTablePagination } from "./DataTablePagination";

const Home = async () => {
  const getGreenbeanData = await apiGetGreenbeanData();

  const coffeeLibreVendor = getGreenbeanData.vendors.find(
    (vendor: { name: string }) => vendor.name === "커피리브레",
  );

  const mockData =
    coffeeLibreVendor?.products.map((product: any) => ({
      ...product,
      vendorName: coffeeLibreVendor.name,
      vendorKey: coffeeLibreVendor.key,
    })) ?? [];

  return (
    <div className="w-full p-3">
      <div className="p-2 flex flex-col gap-1">
        <DataTable columns={columns} data={mockData} />
      </div>
    </div>
  );
};

export default Home;
