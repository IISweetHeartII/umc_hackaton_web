import React from "react";
import { useNavigate } from "react-router-dom";

export interface ProductCardProps {
  // `ProductCard`는 목록 페이지에서 호출되므로, FundingItem의 일부만 props로 받습니다.
  // 필요한 데이터만 명시적으로 정의하여 사용합니다.
  product: {
    id: number;
    name: string;
    imageUrl: string;
    currentPrice: number;
    location: string;
    participants: number;
    maxParticipants?: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/purchase/${product.id}`);
  };

  const displayParticipants = product.maxParticipants
    ? `${product.participants}/${product.maxParticipants}명`
    : `${product.participants}명`;

  return (
    <div onClick={handleCardClick} className="cursor-pointer">
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-40 object-cover rounded-lg"
        />
        <div className="absolute top-2 right-2 bg-black/40 text-white text-xs px-2 py-1 rounded-full">
          MD 추천
        </div>
      </div>
      <div className="mt-2">
        <p className="text-sm font-bold truncate">{product.name}</p>
        <p className="text-xs text-gray-500">{product.location}</p>
        <p className="text-sm font-bold mt-1">{displayParticipants}</p>
        <p className="text-lg font-extrabold">
          {product.currentPrice.toLocaleString()}원/1장
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
