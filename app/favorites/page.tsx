"use client";

import React, { useEffect, useState } from "react";
import { getColumns } from "../colums";
import { FavoriteTable } from "@/components/favorites/FavoriteTable";
import { GreenBean } from "@/types/types";
import { Button } from "@/components/ui/button";
import { FAVORITE_KEY } from "@/constants/storageKey";
import { toast } from "sonner";

const page = () => {
  const [favoriteData, setFavoriteData] = useState<GreenBean[]>([]);

  const handleBulkDelete = () => {
    if (favoriteData.length === 0) {
      toast.info("삭제할 생두 정보가 없습니다.", {
        position: "top-center",
      });
      return;
    }

    if (confirm("찜 목록을 일괄 삭제하시겠습니까?")) {
      localStorage.removeItem(FAVORITE_KEY);

      window.dispatchEvent(new Event("favorite-bean-change"));

      toast.success("찜 목록이 모두 삭제되었습니다.", {
        position: "top-center",
      });
    }
  };

  // 마운트 로컬 스토리지 값 갱신
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
      <div className="flex items-center justify-between">
        <h1 className="section-title">찜한 생두 리스트</h1>
        <Button variant="destructive" size="xs" onClick={handleBulkDelete}>
          일괄 삭제
        </Button>
      </div>

      <FavoriteTable data={favoriteData} columns={getColumns("delete")} />
    </section>
  );
};

export default page;
