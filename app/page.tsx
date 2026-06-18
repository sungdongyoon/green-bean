import { apiGetGreenbeanData } from "@/utils/greenbean/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DataTable } from "./dataTable";
import { columns } from "./colums";

const Home = async () => {
  // const { data } = useQuery({
  //   queryKey: ["greenbean"],
  //   queryFn: () =>
  //     axios.get("/green-bean-vendors.json").then((res) => res.data),
  // });

  // const vendorsData = data?.vendors?.map(
  //   (vendor: { name: string; key: string }) => vendor.name,
  // );

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
    <div className="bg-gray-400 w-full h-screen p-3">
      <div className="p-2 flex flex-col gap-1">
        <DataTable columns={columns} data={mockData} />
      </div>
    </div>
  );
};

export default Home;
