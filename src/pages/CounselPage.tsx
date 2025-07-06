import React, { useState, useMemo, useEffect } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";
import api from "../apis";

// 상담카드 UI (아래에서 정의)
import CounselCard from "../components/CounselCard";

// 서버에서 내려주는 상담센터 타입
interface Counsel {
  isOpen: boolean;
  consultType: string;
  facilityName: string;
  phone: string;
  webUrl: string;
  weekdayStartTime: string;   // "09:00:00"
  weekdayEndTime: string;
  weekendStartTime: string;
  weekendEndTime: string;
}

// 종류
const typeList = ["전체", "주민센터", "복지센터", "인터넷 포털"];
const statusList = ["전체", "영업중", "영업종료"];

const CounselPage = () => {
  const [search, setSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [type, setType] = useState<string>("전체");
  const [status, setStatus] = useState<string>("전체");

  // 서버 목록
  const [list, setList] = useState<Counsel[]>([]);
  const [loading, setLoading] = useState(false);

  // 서버 연동
  useEffect(() => {
    setLoading(true);
    api.get("/facilities/")
      .then(res => setList(res.data.result || []))
      .catch(() => setList([]))
      .finally(() => setLoading(false));
  }, []);

  // 필터 태그
  const filterTags = useMemo(() => {
    const tags = [];
    if (type !== "전체") tags.push(type);
    if (status !== "전체") tags.push(status);
    return tags;
  }, [type, status]);

  // 실제 표시 데이터
  const filteredList = useMemo(() => {
    return list.filter(item => {
      // 이름/키워드
      const searchOk = !search || item.facilityName.includes(search);
      // 영업중 여부
      let statusOk = true;
      if (status === "영업중") statusOk = item.isOpen;
      if (status === "영업종료") statusOk = !item.isOpen;
      // 종류
      let typeOk = true;
      if (type !== "전체") typeOk = item.consultType === type;
      return searchOk && statusOk && typeOk;
    });
  }, [list, search, status, type]);

  // --- 드래그 관련(모달) ---
  const [dragStartY, setDragStartY] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => setDragStartY(e.touches[0].clientY);
  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (dragStartY !== null) setDragOffset(Math.max(0, e.touches[0].clientY - dragStartY));
  };
  const onTouchEnd = () => {
    if (dragOffset > 80) setIsFilterOpen(false);
    setDragStartY(null);
    setDragOffset(0);
  };

  return (
    <div className="relative bg-[#f5f5f5] min-h-screen pb-24 overflow-y-auto">
      {/* 상단 고정바 */}
      <div className="sticky top-0 z-20 bg-white shadow-md pt-4 pb-2 px-4" style={{ minHeight: 80 }}>
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              className="border border-blue-200 px-3 py-2 rounded-2xl w-full text-base"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="시설명 검색"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1">
              <FiSearch size={22} />
            </button>
          </div>
          <button
            className="flex items-center gap-1 text-sm text-gray-700 border border-gray-300 px-3 py-1 rounded ml-2 min-w-[64px] bg-white"
            onClick={() => setIsFilterOpen(true)}
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
        <div className="text-center text-base font-bold mb-1">
          상담이 가능한 시설이에요!
        </div>
      </div>
      {/* 상담카드 리스트 */}
      <div className="flex flex-col gap-4 pt-2 px-4">
        {loading ? (
          <div className="text-center text-gray-400 mt-10">로딩중...</div>
        ) : filteredList.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">검색 결과가 없습니다.</div>
        ) : (
          filteredList.map((item, idx) => (
            <CounselCard
              key={item.facilityName + idx}
              name={item.facilityName}
              phone={item.phone}
              isOpen={item.isOpen}
              site={item.webUrl}
              consultType={item.consultType}
              weekdayStartTime={item.weekdayStartTime}
              weekdayEndTime={item.weekdayEndTime}
              weekendStartTime={item.weekendStartTime}
              weekendEndTime={item.weekendEndTime}
            />
          ))
        )}
      </div>
      {/* 필터 모달 */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 flex items-end justify-center"
          onClick={() => setIsFilterOpen(false)}
        >
          <div
            className="w-full max-w-md mx-auto bg-white rounded-t-2xl p-6 pb-4 shadow-lg"
            style={{
              minHeight: 330,
              transform: `translateY(${dragOffset}px)`,
              transition: dragStartY ? "none" : "transform 0.2s",
            }}
            onClick={e => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-4 cursor-pointer" />
            {/* 영업상태 */}
            <div className="mb-4">
              <div className="font-semibold mb-2">영업상태</div>
              <div className="flex gap-2 flex-wrap">
                {statusList.map(v => (
                  <button
                    key={v}
                    className={`
                      px-3 py-1 rounded border text-sm
                      ${status === v
                        ? "bg-[#b3dfd6] font-bold border-[#8ccfb6] text-gray-900"
                        : "border-gray-300 text-gray-700 bg-white"}
                      transition
                    `}
                    onClick={() => setStatus(v)}
                  >{v}</button>
                ))}
              </div>
            </div>
            {/* 카테고리 */}
            <div className="mb-4">
              <div className="font-semibold mb-2">카테고리</div>
              <div className="flex gap-2 flex-wrap">
                {typeList.map(v => (
                  <button
                    key={v}
                    className={`
                      px-3 py-1 rounded border text-sm
                      ${type === v
                        ? "bg-[#b3dfd6] font-bold border-[#8ccfb6] text-gray-900"
                        : "border-gray-300 text-gray-700 bg-white"}
                      transition
                    `}
                    onClick={() => setType(v)}
                  >{v}</button>
                ))}
              </div>
            </div>
            <button
              className="w-full mt-2 bg-[#80bfae] text-white py-2 rounded font-semibold text-lg"
              onClick={() => setIsFilterOpen(false)}
            >
              완료
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CounselPage;
