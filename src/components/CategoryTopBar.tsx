import { useNavigate } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";

const CategoryTopBar = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-3 py-3 sticky top-0 bg-white z-30 shadow-sm px-4">
      <button onClick={() => navigate(-1)}>
        <FiChevronLeft size={26} />
      </button>
      <div className="font-bold text-xl flex-1 text-center mr-10">{title}</div>
    </div>
  );
};

export default CategoryTopBar;
