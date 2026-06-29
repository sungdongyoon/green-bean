"use client";

import React, { useEffect, useState } from "react";
import { getColumns } from "../colums";
import { FavoriteTable } from "@/components/favorites/FavoriteTable";
import { GreenBean } from "@/types/types";

const page = () => {
  const [favoriteData, setFavoriteData] = useState<GreenBean[]>([]);

  useEffect(() => {
    const syncFavoriteData = () => {
      const getFavoriteData = localStorage.getItem("favorite-bean");
      setFavoriteData(getFavoriteData ? JSON.parse(getFavoriteData) : []);
    };

    syncFavoriteData();

    window.addEventListener("favorite-bean-change", syncFavoriteData);

    return () => {
      window.removeEventListener("favorite-bean-change", syncFavoriteData);
    };
  }, []);

  return (
    <section className="section">
      <h1 className="section-title">찜한 생두 리스트</h1>
      <FavoriteTable data={favoriteData} columns={getColumns("delete")} />
    </section>
  );
};

export default page;
