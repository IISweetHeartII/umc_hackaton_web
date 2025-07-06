import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMyInfo, type UserInfo } from "../apis/user";
import { getMyFundingList, type FundingItem } from "../apis/purchase";

const profileImg =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=128&q=80";

const MyPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [myFundings, setMyFundings] = useState<FundingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyInfo()
      .then(setUser)
      .catch((e: Error) => {
        alert(e.message || "내 정보를 불러오지 못했습니다.");
      })
      .finally(() => setLoading(false));

    getMyFundingList()
      .then(setMyFundings)
      .catch((e: Error) => {
        // 유저 정보가 중요하므로, 펀딩 목록 에러는 alert만 하고 로딩은 멈추지 않습니다.
        alert(e.message || "내 펀딩 목록을 불러오지 못했습니다.");
      });
  }, []);

  // 나이 계산 함수
  const getAge = (birth: string) => {
    if (!birth) return "-";
    const today = new Date();
    const birthDate = new Date(birth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleLogout = () => {
    // 로그아웃 처리
    // localStorage.clear(); // 필요 시
    navigate("/login");
  };

  const handleWithdraw = () => {
    const confirmed = window.confirm("정말 탈퇴하시겠습니까?");
    if (confirmed) {
      navigate("/goodbye");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-gray-400">로딩 중...</span>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white pt-6 pb-4 px-4">
      {/* 상단 타이틀 */}
      <div className="text-center font-bold text-xl mb-6">마이 페이지</div>

      {/* 프로필 카드 */}
      <div className="flex items-center mb-6">
        {/* 프로필 사진 */}
        <img
          src={
            user?.profileImage
              ? `data:image/jpeg;base64,${user.profileImage}`
              : profileImg
          }
          alt="프로필"
          className="w-14 h-14 rounded-full object-cover border mr-3"
        />
        <div className="flex-1">
          <div className="font-bold text-[19px] leading-tight">
            {user?.name ?? "-"}
          </div>
          <div className="text-[#7B977F] text-[15px]">
            {user?.birth ? `${getAge(user.birth)}세` : "-"}
            {user?.regionName ? ` · ${user.regionName} 거주` : ""}
          </div>
        </div>
        <button
          className="bg-[#538E79] text-white text-sm font-medium px-4 py-2 rounded-lg"
          onClick={() => navigate("/edit-profile")}
        >
          프로필 수정
        </button>
      </div>

      {/* 펀딩 목록 */}
      <div className="mb-5">
        <div
          className="flex justify-between items-center mb-3 cursor-pointer"
          onClick={() => navigate("/my-fundings")}
        >
          <span className="font-bold text-base">내가 참여한 펀딩 목록</span>
          <span className="text-2xl text-[#222]">{">"}</span>
        </div>
        <div className="flex gap-3 overflow-x-auto">
          {myFundings.length > 0 ? (
            myFundings.map((funding) => (
              <img
                key={funding.id}
                src={funding.image}
                alt={`펀딩${funding.id}`}
                className="w-24 h-28 object-cover rounded-xl bg-gray-100"
              />
            ))
          ) : (
            <div className="w-full text-center py-10 text-gray-400">
              참여한 펀딩이 없습니다.
            </div>
          )}
        </div>
      </div>

      {/* 저장한 공고 조회 */}
      <div>
        <div
          className="flex justify-between items-center mb-5 cursor-pointer"
          onClick={() => navigate("/saved-posts")}
        >
          <span className="font-bold text-base">저장한 공고 조회</span>
          <span className="text-2xl text-[#222]">{">"}</span>
        </div>
        <hr className="my-3 border-gray-300" />
      </div>

      {/* 기타 */}
      <div>
        <div className="font-bold mb-3 text-base">기타</div>
        <div
          className="text-gray-700 mb-2 cursor-pointer"
          onClick={handleLogout}
        >
          로그아웃
        </div>
        <div className="text-gray-700 cursor-pointer" onClick={handleWithdraw}>
          회원탈퇴
        </div>
      </div>
    </div>
  );
};

export default MyPage;
