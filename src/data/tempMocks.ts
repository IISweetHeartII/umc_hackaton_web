// TODO: 카테고리 API가 추가되면 해당 파일은 제거되어야 합니다.
// 임시로 사용할 카테고리 타입과 목 데이터
export interface Category {
  name: string;
  emoji: string;
}

export const mockCategories: Category[] = [
  { name: "거실", emoji: "🛋️" },
  { name: "주방", emoji: "🍳" },
  { name: "침실", emoji: "🛏️" },
  { name: "욕실", emoji: "🚽" },
];
