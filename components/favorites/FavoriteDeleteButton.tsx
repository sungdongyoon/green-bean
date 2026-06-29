import { FAVORITE_KEY } from "@/constants/storageKey";
import { GreenBean } from "@/types/types";
import React from "react";
import { FaTrash } from "react-icons/fa6";

const FavoriteDeleteButton = ({ beanData }: { beanData: GreenBean }) => {
  return (
    <button
      type="button"
      className="flex w-full justify-center cursor-pointer"
      onClick={() => {
        if (confirm("찜 목록에서 삭제하시겠습니까?")) {
          const store = localStorage.getItem(FAVORITE_KEY);
          const basket: GreenBean[] = store ? JSON.parse(store) : [];

          const nextBasket = basket.filter(
            (item) => item.productNo !== beanData.productNo,
          );

          localStorage.setItem(FAVORITE_KEY, JSON.stringify(nextBasket));

          window.dispatchEvent(new Event("favorite-bean-change"));
        }
      }}
    >
      <FaTrash className="size-4 text-red-500" />
    </button>
  );
};

export default FavoriteDeleteButton;
