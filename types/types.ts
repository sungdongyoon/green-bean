// 생두 국가 리스트
export interface OriginList {
  originKey: string;
  originName: string;
  region:
    | "africa"
    | "centralAmerica"
    | "southAmerica"
    | "asia"
    | "middleEast"
    | "caribbean"
    | "northAmerica";
}

// 생두 테이블 컬럼
export type GreenBean = {
  id: string;
  vendorName: string;
  name: string;
  unit: string;
  priceKrw: number;
  productUrl: string;
  productNo: string;
  origin: string;
  status: string;
};

// 데이터 테이블 columns action 타입
export type ActionColumn = "favorite" | "delete";
