import React from "react";
import { IoClose } from "react-icons/io5";

export interface SellerCardInfo {
  name: string;
  profileImageUrl?: string;
  comment?: string;
}

interface SellerCardProps {
  seller: SellerCardInfo;
  onDelete?: () => void;
}

const SellerCard: React.FC<SellerCardProps> = ({ seller, onDelete }) => {
  return (
    <div className="flex items-start gap-3 py-3">
      {seller.profileImageUrl && (
        <img
          src={seller.profileImageUrl}
          alt={seller.name}
          className="w-10 h-10 rounded-full object-cover"
        />
      )}
      <div className="flex-1">
        <p className="font-bold text-sm">{seller.name}</p>
        {seller.comment && (
          <p className="text-gray-700 text-sm">{seller.comment}</p>
        )}
      </div>
      {onDelete && (
        <button
          onClick={onDelete}
          className="text-gray-400 hover:text-gray-600"
        >
          <IoClose size={18} />
        </button>
      )}
    </div>
  );
};

export default SellerCard;
