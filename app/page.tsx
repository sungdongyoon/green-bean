"use client";

import { apiGetGreenbeanData } from "@/utils/greenbean/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DataTable } from "./dataTable";
import { columns } from "./colums";

const Home = () => {
  const { data } = useQuery({
    queryKey: ["greenbean"],
    queryFn: () =>
      axios.get("/green-bean-vendors.json").then((res) => res.data),
  });

  const vendorsData = data?.vendors?.map(
    (vendor: { name: string; key: string }) => vendor.name,
  );
  const mockData = data?.vendors?.filter(
    (vendor: { name: string }) => vendor.name === "커피리브레",
  )[0].products;

  console.log("data", data);
  console.log("mockData", mockData);
  return (
    <div className="bg-gray-400 w-full h-screen p-3">
      <div className="bg-yellow-50 p-2 flex flex-col gap-1">
        {/* <DataTable columns={columns} data={mockData} /> */}
      </div>
    </div>
  );
};

export default Home;
