// [get] 생두 데이터
export const apiGetGreenbeanData = async () => {
  const response = await fetch("http://localhost:3000/green-bean-vendors.json");
  if (!response.ok) {
    throw new Error("생두 데이터를 불러오지 못했습니다.");
  }
  return response.json();
};
