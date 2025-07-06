import { useEffect, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import HomeTopBar from "../components/HomeTopBar";
import { useNavigate } from "react-router-dom";
import BottomNavBar from "../components/BottomNavBar";
import { fetchMyInfo, type UserInfo } from "../apis/user";

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    fetchMyInfo()
      .then(setUser)
      .catch((e) => {
        console.error("사용자 정보를 불러오는데 실패했습니다.", e);
      });
  }, []);

  return (
    <div className="px-4 py-6">
      <HomeTopBar />

      <header className="mb-3 mt-12">
        <div className="font-bold text-xl mb-1">
          안녕하세요 {user ? `${user.name}님` : "..."},
        </div>
        <div className="font-bold text-lg mt-2">어떤 정보가 필요하세요?</div>
      </header>
      <div className="grid grid-cols-2 gap-4 mt-10">
        <CategoryCard
          emoji="🏡"
          title={
            <>
              분양 중인
              <br />
              장애인 주택
            </>
          }
          bgColor="#C5ECDE"
          onClick={() => navigate("/category1")}
        />
        <CategoryCard
          emoji="💸"
          title={
            <>
              대출,
              <br />
              보조금 지원
            </>
          }
          bgColor="#8DE1D1"
          onClick={() => navigate("/category2")}
        />
        <CategoryCard
          emoji="🧰"
          title={
            <>
              집 시설
              <br />
              보수 지원
            </>
          }
          bgColor="#8DE1D1"
          onClick={() => navigate("/category3")}
        />
        <CategoryCard
          emoji="🧹"
          title={
            <>
              편의시설
              <br />
              설치
            </>
          }
          bgColor="#C5ECDE"
          onClick={() => navigate("/category4")}
        />
      </div>
      <BottomNavBar />
    </div>
  );
};

export default HomePage;
