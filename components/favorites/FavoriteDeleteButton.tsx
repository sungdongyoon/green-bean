import { FAVORITE_KEY } from "@/constants/storageKey";
import { GreenBeanData } from "@/store/useGreenBeanStore";
import { GreenBean } from "@/types/types";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "sonner";

const FavoriteDeleteButton = ({ beanData }: { beanData: GreenBeanData }) => {
  return (
    <button
      type="button"
      className="flex w-full justify-center cursor-pointer"
      onClick={() => {
        if (confirm("찜 목록에서 삭제하시겠습니까?")) {
          const store = localStorage.getItem(FAVORITE_KEY);
          const basket: GreenBeanData[] = store ? JSON.parse(store) : [];

          const nextBasket = basket.filter(
            (item) => item.productNo !== beanData.productNo,
          );

          localStorage.setItem(FAVORITE_KEY, JSON.stringify(nextBasket));

          window.dispatchEvent(new Event("favorite-bean-change"));
          toast.success("삭제되었습니다.", {
            position: "top-center",
          });
        }
      }}
    >
      <FaRegTrashAlt className="size-4" />
    </button>
  );
};

export default FavoriteDeleteButton;
