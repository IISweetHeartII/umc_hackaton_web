import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import CategoryTopBar from "../components/CategoryTopBar";
import AnnouncementCard from "../components/AnnouncementCard";
import CategoryFilterBar from "../components/CategoryFilterBar";
import CategoryFilterModal from "../components/CategoryFilterModal";
import { fetchAnnouncements, type Announcement } from "../apis/announcements";
import dayjs from "dayjs";

// 맵핑
const regionMap = {
  전체: undefined,
  서울: "SEOUL",
  부산: "BUSAN",
  대구: "DAEGU",
  인천: "INCHEON",
  광주: "GWANGJU",
  대전: "DAEJEON",
  울산: "ULSAN",
  세종: "SEJONG",
  경기: "GYEONGGI",
  강원: "GANGWON",
  충북: "CHUNGBUK",
  충남: "CHUNGNAM",
  전북: "JEONBUK",
  전남: "JEONNAM",
  경북: "GYEONGBUK",
  경남: "GYEONGNAM",
  제주: "JEJU",
} as const;
const regionOptions = Object.keys(regionMap) as (keyof typeof regionMap)[];

const statusList = ["전체", "지원 중", "지원 마감"];
const targetMap = {
  전체: undefined,
  청년: "YOUNG",
  "1인가구": "ALONE",
  "65세 이상": "ELDER",
} as const;
const targetOptions = Object.keys(targetMap) as (keyof typeof targetMap)[];

const Category2Page = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [status, setStatus] = useState("전체");
  const [region, setRegion] = useState<keyof typeof regionMap>("전체");
  const [target, setTarget] = useState<keyof typeof targetMap>("전체");

  const [list, setList] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(false);

  const filterTags = useMemo(() => {
    const tags = [];
    if (status !== "전체") tags.push(status);
    if (region !== "전체") tags.push(region);
    if (target !== "전체") tags.push(target);
    return tags;
  }, [status, region, target]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const params: { type: string; region?: string; target?: string } = {
          type: "LOAN",
        };
        if (region !== "전체") params.region = regionMap[region];
        if (target !== "전체") params.target = targetMap[target];
        const res = await fetchAnnouncements(params);
        setList(res);
      } catch {
        setList([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [region, target]);

  const filtered = useMemo(() => {
    const today = dayjs().startOf("day");
    return list.filter((item) => {
      const deadline = dayjs(item.openDate, ["YYYY-MM-DD", "YYYY.MM.DD"]);
      const diff = deadline.diff(today, "day");
      const isOpen = diff >= 0;

      let statusMatch = true;
      if (status === "지원 중") statusMatch = isOpen;
      if (status === "지원 마감") statusMatch = !isOpen;

      const searchMatch = !search || item.title.includes(search);

      return statusMatch && searchMatch;
    });
  }, [list, search, status]);

  // 모달 드래그
  const [dragStartY, setDragStartY] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState<number>(0);

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) =>
    setDragStartY(e.touches[0].clientY);
  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (dragStartY !== null)
      setDragOffset(Math.max(0, e.touches[0].clientY - dragStartY));
  };
  const onTouchEnd = () => {
    if (dragOffset > 80) setIsFilterOpen(false);
    setDragStartY(null);
    setDragOffset(0);
  };

  return (
    <div className="relative bg-[#f5f5f5] min-h-screen pb-24 overflow-y-auto">
      <CategoryTopBar title="대출, 보조금 지원" />

      <CategoryFilterBar
        search={search}
        onSearchChange={setSearch}
        onFilterOpen={() => setIsFilterOpen(true)}
        filterTags={filterTags}
      />

      <div className="flex flex-col gap-4 pt-4 px-4">
        {loading ? (
          <div className="text-center text-gray-400 mt-10">로딩중...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">
            검색 결과가 없습니다.
          </div>
        ) : (
          filtered.map((item) => (
            <AnnouncementCard
              key={item.id}
              id={item.id}
              title={item.title}
              region={item.region}
              target={item.target}
              openDate={item.openDate}
              onClick={() => navigate(`/announcements/${item.id}`)}
            />
          ))
        )}
      </div>

      {isFilterOpen && (
        <CategoryFilterModal
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          status={status}
          setStatus={setStatus}
          region={region}
          setRegion={(v: string) => setRegion(v as typeof region)}
          target={target}
          setTarget={(v) => setTarget(v as typeof target)}
          statusList={statusList}
          regionList={regionOptions}
          targetList={targetOptions}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          dragOffset={dragOffset}
        />
      )}
    </div>
  );
};

export default Category2Page;
