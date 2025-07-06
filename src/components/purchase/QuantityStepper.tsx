import React from "react";

interface QuantityStepperProps {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  price: number;
  showTotalPrice?: boolean;
}

const QuantityStepper: React.FC<QuantityStepperProps> = ({
  quantity,
  setQuantity,
  price,
  showTotalPrice = false,
}) => {
  const handleDecrement = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className="my-4">
      <div className="flex items-center justify-between">
        <span className="font-semibold">수량</span>
        <div className="flex items-center gap-3">
          <button
            onClick={handleDecrement}
            className="w-8 h-8 flex items-center justify-center text-lg border border-gray-300 rounded-md disabled:text-gray-300"
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="text-lg font-bold">{quantity}</span>
          <button
            onClick={handleIncrement}
            className="w-8 h-8 flex items-center justify-center text-lg border border-gray-300 rounded-md"
          >
            +
          </button>
        </div>
      </div>
      {showTotalPrice && (
        <div className="text-right mt-2">
          <span className="text-lg font-bold">
            총 {quantity}개 {(quantity * price).toLocaleString()}원
          </span>
        </div>
      )}
    </div>
  );
};

export default QuantityStepper;
