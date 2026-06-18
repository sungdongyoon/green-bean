import axios from "axios";

// [get] 생두 데이터
export const apiGetGreenbeanData = async () => {
  try {
    const response = await axios.get("/green-bean-vendors.json");

    return response.data;
  } catch (error) {
    throw new Error("생두 데이터를 불러오지 못했습니다.");
  }
};
