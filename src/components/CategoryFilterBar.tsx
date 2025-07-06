import { FiSearch, FiFilter } from "react-icons/fi";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  onFilterOpen: () => void;
  filterTags: string[];
}

const CategoryFilterBar = ({
  search,
  onSearchChange,
  onFilterOpen,
  filterTags
}: Props) => (
  <div className="sticky top-[52px] z-20 bg-[#f5f5f5] pt-2 pb-1 px-4">
    {/* 검색 & 필터 */}
    <div className="flex items-center gap-2">
      <div className="flex-1 relative">
        <input
          className="
            w-full bg-gray-100 border-none rounded-lg py-3 pl-4 pr-10
            focus:ring-2 focus:ring-[#538E79] focus:outline-none text-base
            shadow-sm placeholder:text-gray-400
          "
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="원하는 공고를 검색해보세요!"
        />
        <FiSearch
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>
      <button
        className="flex items-center gap-1 text-sm text-gray-700 border border-gray-300 px-3 py-2 rounded-lg min-w-[64px] bg-white shadow-sm"
        onClick={onFilterOpen}
      >
        <FiFilter size={16} />
        필터
      </button>
    </div>
    {/* 필터 태그 */}
    <div className="flex gap-2 mt-2 overflow-x-auto scrollbar-hide pb-1">
      {filterTags.length === 0 ? (
        <span className="bg-gray-200 rounded-full px-3 py-1 text-xs text-gray-600 whitespace-nowrap font-medium">
          전체
        </span>
      ) : (
        filterTags.map((tag, idx) => (
          <span
            key={tag + idx}
            className="bg-gray-200 rounded-full px-3 py-1 text-xs text-gray-600 whitespace-nowrap font-medium"
          >
            {tag}
          </span>
        ))
      )}
    </div>
  </div>
);

export default CategoryFilterBar;
