import React from "react";

interface CategoryCardProps {
  title: React.ReactNode;
  emoji: string;
  bgColor: string;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  emoji,
  bgColor,
  onClick,
}) => {
  return (
    <div
      className={`
        rounded-2xl p-5 pb-6 flex flex-col justify-between items-start cursor-pointer
        shadow-md hover:shadow-lg transition-shadow
        ring-1 ring-gray-100
        active:scale-95 duration-150
        h-48 w-full
      `}
      style={{ background: bgColor, maxWidth: 170 }}
      onClick={onClick}
    >
      
      <div className="mt-auto flex flex-col items-start w-full">
        <span className="text-6xl drop-shadow mb-2">{emoji}</span>
        <div className="text-[16px] font-bold">{title}</div>
      </div>
    </div>
  );
};

export default CategoryCard;
