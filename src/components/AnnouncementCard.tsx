import dayjs from "dayjs";

interface Props {
  id: number;
  title: string;
  region: string;
  target: string;
  openDate: string;
  onClick?: () => void;
}

const AnnouncementCard = ({
  title,
  region,
  target,
  openDate,
  onClick,
}: Props) => {
  // openDate 포맷 자동 인식 (YYYY-MM-DD, YYYY.MM.DD)
  const deadline = dayjs(openDate, ["YYYY-MM-DD", "YYYY.MM.DD"]);
  const today = dayjs().startOf("day");
  const diff = deadline.diff(today, "day");

  let dday = "";
  if (diff > 0) dday = `D-${diff}`;
  else if (diff === 0) dday = "D-DAY";
  else dday = "마감";

  const isOpen = diff >= 0;
  const status = isOpen ? "모집 중" : "모집 마감";
  const statusColor = isOpen ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-500";

  return (
    <div
      onClick={onClick}
      className="rounded-2xl p-4 bg-white shadow flex flex-col gap-2 active:scale-95 transition cursor-pointer"
    >
      <div className="flex items-center gap-2">
        <span className="bg-green-50 text-green-800 font-bold text-base rounded-lg px-3 py-1">{dday}</span>
        <span className={`text-xs px-2 py-1 rounded-full font-bold ${statusColor}`}>
          {status}
        </span>
        <span className="bg-blue-50 text-blue-900 px-2 py-1 rounded-lg text-xs font-semibold">{region}</span>
        <span className="bg-blue-100 text-blue-900 px-2 py-1 rounded-lg text-xs font-semibold">{target}</span>
      </div>
      <div className="font-semibold text-base">{title}</div>
      <div className="text-xs text-gray-500">{openDate && `마감일: ${deadline.format("YYYY.MM.DD")}`}</div>
    </div>
  );
};

export default AnnouncementCard;