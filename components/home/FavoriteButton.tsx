"use client";

import { FAVORITE_KEY } from "@/constants/storageKey";
import { GreenBeanData } from "@/store/useGreenBeanStore";
import { GreenBean } from "@/types/types";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { toast } from "sonner";

const FavoriteButton = ({ beanData }: { beanData: GreenBeanData }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    // 로컬 스토리지 값 불러오기
    const store = localStorage.getItem(FAVORITE_KEY);
    const basket: GreenBeanData[] = store ? JSON.parse(store) : [];

    // favorite 상태
    const isAlreadyFavorite = basket.some(
      (item) => item.productNo === beanData.productNo,
    );

    setIsFavorite(isAlreadyFavorite);
  }, [beanData.productNo]);

  // favorite 클릭 함수
  const handleFavorite = () => {
    // 로컬 스토리지 값 불러오기
    const store = localStorage.getItem(FAVORITE_KEY);
    const basket: GreenBean[] = store ? JSON.parse(store) : [];

    // favorite 상태
    const alreadyFavorite = basket.some(
      (item) => item.productNo === beanData.productNo,
    );

    // favorite이 true인 경우 favorite에서 제거
    if (alreadyFavorite) {
      const deleteBasket = basket.filter(
        (item) => item.productNo !== beanData.productNo,
      );

      localStorage.setItem(FAVORITE_KEY, JSON.stringify(deleteBasket));

      window.dispatchEvent(new Event("favorite-bean-change"));

      setIsFavorite(false);

      toast.success("찜 목록에서 제거되었습니다.", {
        position: "top-center",
      });
      return;
    }

    // 기존 storage 값에 새로운 값 추가
    const nextBasket = [...basket, beanData];

    localStorage.setItem(FAVORITE_KEY, JSON.stringify(nextBasket));

    setIsFavorite(true);

    window.dispatchEvent(new Event("favorite-bean-change"));

    toast.success("찜 목록에 추가되었습니다.", { position: "top-center" });
  };

  return (
    <button
      type="button"
      className="flex w-full justify-center cursor-pointer"
      onClick={handleFavorite}
    >
      {isFavorite ? (
        <FaHeart className="size-4 text-red-500" />
      ) : (
        <FaRegHeart className="size-4" />
      )}
    </button>
  );
};

export default FavoriteButton;
