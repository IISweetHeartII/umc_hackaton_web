import React from "react";

interface PriceProgressBarProps {
  currentPrice: number;
  startPrice: number;
  maxPrice: number;
}

const PriceProgressBar: React.FC<PriceProgressBarProps> = ({
  currentPrice,
  startPrice,
  maxPrice,
}) => {
  // maxPrice가 startPrice와 같거나 작으면 0으로 나눌 수 없으므로 100%로 처리하거나 0%로 처리
  const progress =
    maxPrice > startPrice
      ? ((currentPrice - startPrice) / (maxPrice - startPrice)) * 100
      : currentPrice >= maxPrice
      ? 100
      : 0;
  const clampedProgress = Math.min(100, Math.max(0, progress)); // 0%와 100% 사이로 값 제한

  return (
    <div className="mt-4">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>{startPrice.toLocaleString()}원</span>
        <span>{maxPrice.toLocaleString()}원</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-[#D3E4D6] h-2.5 rounded-full"
          style={{ width: `${clampedProgress}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>시작가</span>
        <span>최대 할인가</span>
      </div>
    </div>
  );
};

export default PriceProgressBar;
