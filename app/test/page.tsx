"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const page = () => {
  const { data } = useQuery({
    queryKey: ["greenbean"],
    queryFn: () =>
      axios.get("/green-bean-vendors.json").then((res) => res.data),
  });

  console.log("data", data);
  return <div></div>;
};

export default page;
