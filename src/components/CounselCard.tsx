interface CounselCardProps {
  name: string;
  phone: string;
  isOpen: boolean;
  site: string;
  consultType: string;
  weekdayStartTime: string;
  weekdayEndTime: string;
  weekendStartTime: string;
  weekendEndTime: string;
}

const CounselCard = ({
  name, phone, isOpen, site, consultType,
  weekdayStartTime, weekdayEndTime, weekendStartTime, weekendEndTime
}: CounselCardProps) => (
  <div className="rounded-2xl bg-white shadow p-4 flex flex-col gap-2">
    <div className="flex items-center gap-2">
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${isOpen ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-500"}`}>
        {isOpen ? "영업중" : "영업종료"}
      </span>
      <span className="ml-2 font-bold">{name}</span>
    </div>
    <div className="text-sm text-gray-700">전화: <a href={`tel:${phone}`}>{phone}</a></div>
    <div className="text-xs text-gray-500">종류: {consultType}</div>
    <a href={site} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline text-xs">사이트 바로가기</a>
    <div className="text-xs text-gray-400">
      평일 {weekdayStartTime}~{weekdayEndTime} &nbsp;|&nbsp; 주말 {weekendStartTime}~{weekendEndTime}
    </div>
  </div>
);

export default CounselCard;
