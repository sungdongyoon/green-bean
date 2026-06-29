"use client";

import React, { useEffect, useState } from "react";
import { getColumns } from "../colums";
import { FavoriteTable } from "@/components/favorites/FavoriteTable";
import { GreenBean } from "@/types/types";

const page = () => {
  const [favoriteData, setFavoriteData] = useState<GreenBean[]>([]);

  useEffect(() => {
    const getFavoriteData = localStorage.getItem("favorite-bean");
    setFavoriteData(getFavoriteData ? JSON.parse(getFavoriteData) : []);
  }, []);

  return (
    <section className="section">
      <h1 className="section-title">좋아요 페이지</h1>
      <FavoriteTable data={favoriteData} columns={getColumns("delete")} />
    </section>
  );
};

export default page;
