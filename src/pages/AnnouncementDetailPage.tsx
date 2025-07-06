import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import CategoryTopBar from "../components/CategoryTopBar";
import api from "../apis"; // axios 인스턴스
import { type Announcement } from "../apis/announcements";

const AnnouncementDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<Announcement | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await api.get(`/announcements/${id}`);
        setData(res.data.result);
      } catch {
        alert("상세 정보를 불러올 수 없습니다.");
        navigate(-1);
      }
    })();
  }, [id, navigate]);

  if (!data) return <div className="p-8 text-center">로딩중...</div>;

  // 오늘 기준으로 모집상태와 남은 일수(마감/모집중) 표시
  const today = dayjs().startOf("day");
  const deadline = dayjs(data.openDate).startOf("day");
  const diff = deadline.diff(today, "day");
  let dday = "";
  let status = "";

  if (diff > 0) {
    dday = `D-${diff}`;
    status = "모집 중";
  } else if (diff === 0) {
    dday = "D-DAY";
    status = "모집 중";
  } else {
    dday = "마감";
    status = "모집 마감";
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] pb-10">
      <CategoryTopBar title={data.title} />
      <div className="bg-white rounded-2xl shadow mx-4 mt-6 p-5 flex flex-col gap-3">
        <div className="flex gap-3">
          <div className="flex flex-col items-center justify-center w-1/3 p-3 bg-green-50 rounded-xl">
            <div className="text-lg font-bold">{dday}</div>
            <div className="text-xs mt-1">{status}</div>
          </div>
          <div className="flex flex-col items-center justify-center w-1/3 p-3 bg-blue-50 rounded-xl">
            <div className="text-sm">{data.region}</div>
          </div>
          <div className="flex flex-col items-center justify-center w-1/3 p-3 bg-blue-100 rounded-xl">
            <div className="text-sm">{data.target}</div>
          </div>
        </div>
        <div className="mt-2 mb-1 text-gray-800 text-sm">{data.institute}</div>
        <div className="font-bold text-lg mt-2">{data.title}</div>
        <div className="text-gray-500 text-xs">
          마감일: {dayjs(data.openDate).format("YYYY.MM.DD")}
        </div>
        <div className="mt-4 text-sm text-gray-700 leading-relaxed">
          {data.infoType || "상세 내용이 없습니다."}
        </div>
      </div>
      <div className="flex flex-col gap-3 mx-4 mt-70">
        <button className="bg-green-200 rounded-xl py-3 font-bold text-gray-800">
          저장 해두기
        </button>
        <a
          href={`https://search.naver.com/search.naver?query=${encodeURIComponent(
            data.title
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-center bg-gray-100 rounded-xl py-3 font-bold text-gray-700"
        >
          사이트로 이동
        </a>
      </div>
    </div>
  );
};

export default AnnouncementDetailPage;
