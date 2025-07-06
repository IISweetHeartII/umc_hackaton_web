import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  status: string;
  setStatus: (v: string) => void;
  region: string;
  setRegion: (v: string) => void;
  target: string;
  setTarget: (v: string) => void;
  statusList: string[];
  regionList: string[];
  targetList: string[];
  onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchMove: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchEnd: () => void;
  dragOffset: number;
}

const CategoryFilterModal = ({
  isOpen,
  onClose,
  status,
  setStatus,
  region,
  setRegion,
  target,
  setTarget,
  statusList,
  regionList,
  targetList,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  dragOffset
}: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-30 flex items-end justify-center" onClick={onClose}>
      <div
        className="w-full max-w-md mx-auto bg-white rounded-t-2xl p-6 pb-4 shadow-lg"
        style={{
          minHeight: 330,
          transform: `translateY(${dragOffset}px)`,
          transition: dragOffset ? "none" : "transform 0.2s"
        }}
        onClick={e => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-4 cursor-pointer" />
        {/* 상태 */}
        <div className="mb-4">
          <div className="font-semibold mb-2">상태</div>
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
        {/* 지역 */}
        <div className="mb-4">
          <div className="font-semibold mb-2">지역</div>
          <select
            className="border px-3 py-2 rounded w-full"
            value={region}
            onChange={e => setRegion(e.target.value)}
          >
            {regionList.map(v => (
              <option key={v} value={v}>{v === "ALL" ? "전체" : v}</option>
            ))}
          </select>
        </div>
        {/* 지원 대상 */}
        <div className="mb-4">
          <div className="font-semibold mb-2">지원 대상</div>
          <div className="flex gap-2 flex-wrap">
            {targetList.map(v => (
              <button
                key={v}
                className={`
                  px-3 py-1 rounded border text-sm
                  ${target === v
                    ? "bg-[#b3dfd6] font-bold border-[#8ccfb6] text-gray-900"
                    : "border-gray-300 text-gray-700 bg-white"}
                  transition
                `}
                onClick={() => setTarget(v)}
              >{v === "ALL" ? "전체" : v}</button>
            ))}
          </div>
        </div>
        <button
          className="w-full mt-2 bg-[#80bfae] text-white py-2 rounded font-semibold text-lg"
          onClick={onClose}
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default CategoryFilterModal;
