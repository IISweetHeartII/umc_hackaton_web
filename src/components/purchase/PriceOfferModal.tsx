import React, { useState } from "react";
import QuantityStepper from "./QuantityStepper";
import { type FundingItem } from "../../apis/purchase";

interface PriceOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: FundingItem;
  onConfirm: (quantity: number) => void;
}

const PriceOfferModal: React.FC<PriceOfferModalProps> = ({
  isOpen,
  onClose,
  product,
  onConfirm,
}) => {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  const handleDone = () => {
    onConfirm(quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-t-2xl absolute bottom-0 w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">{product.name}</h3>
          <button onClick={onClose} className="text-2xl">
            &times;
          </button>
        </div>
        <div className="space-y-4">
          <QuantityStepper
            quantity={quantity}
            setQuantity={setQuantity}
            price={product.currentPrice}
            showTotalPrice
          />
          <button
            onClick={handleDone}
            className="w-full bg-[#538E79] text-white py-3 rounded-lg font-bold"
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceOfferModal;
