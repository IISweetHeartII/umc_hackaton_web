import { FiSearch } from "react-icons/fi";

interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

const CategorySearchBar = ({ value, onChange, placeholder }: Props) => (
  <div className="relative mb-2">
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder ?? "원하는 공고를 검색해보세요!"}
      className="w-full bg-gray-100 border-none rounded-lg py-3 pl-4 pr-10 focus:ring-2 focus:ring-[#538E79] focus:outline-none text-sm"
    />
    <FiSearch
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
      size={20}
    />
  </div>
);

export default CategorySearchBar;
