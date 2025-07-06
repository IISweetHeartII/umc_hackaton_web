interface Category {
  name: string;
  emoji: string;
}

interface CategoryFilterProps {
  categories: Category[];
}

const CategoryFilter = ({ categories }: CategoryFilterProps) => {
  return (
    <div className="flex justify-around">
      {categories.map((category) => (
        <div
          key={category.name}
          className="flex flex-col items-center gap-2 cursor-pointer"
        >
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-3xl hover:bg-gray-200 transition-colors">
            {category.emoji}
          </div>
          <span className="text-sm font-medium">{category.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;
