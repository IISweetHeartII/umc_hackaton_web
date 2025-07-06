import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import backIcon from "../assets/backButton.svg";
import { getMyFundingList, type FundingItem } from "../apis/purchase";
import { calculateDday } from "../utils/calculateDday";

const MyFundings = () => {
  const navigate = useNavigate();
  const [fundings, setFundings] = useState<FundingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyFundingList()
      .then(setFundings)
      .catch((e: Error) =>
        alert(e.message || "펀딩 목록을 불러오지 못했습니다.")
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-gray-400">로딩 중...</span>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-5 bg-white min-h-screen">
      {/* 상단 바 */}
      <div className="relative mb-5 text-center">
        <button onClick={() => navigate(-1)} className="absolute left-0 pl-2 ">
          <img src={backIcon} alt="뒤로가기" className="w-6 h-6" />
        </button>

        <h1 className="text-2xl font-bold">내가 참여한 펀딩 목록</h1>
      </div>

      {/* 펀딩 목록 */}
      <div className="space-y-6">
        {fundings.length > 0 ? (
          fundings.map((item) => (
            <div key={item.id} className="bg-white rounded-lg p-3">
              <div className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 object-cover rounded-md"
                />
                <div className="flex-1">
                  <p className="text-red-500 text-sm font-semibold mt-1">
                    {item.closedDate
                      ? `${calculateDday(item.closedDate)}일 뒤 구매 마감`
                      : "마감일 미정"}
                  </p>
                  <p className="font-semibold text-base">{item.name}</p>
                  <p className="font-semibold text-sm mt-2">
                    현재 가격: {item.currentPrice.toLocaleString()}원
                  </p>
                  <p className="text-sm text-gray-700">
                    내 수량: {item.currentCount}개
                  </p>
                </div>
              </div>

              {/* 버튼 */}
              <div className="flex gap-2 mt-3">
                <button
                  className="flex-1 bg-[#A9CDC1] text-[#0C6345] py-1.5 rounded-md font-semibold"
                  onClick={() => navigate(`/write-review/${item.id}`)}
                >
                  기대평 남기기
                </button>
                <button
                  className="flex-1 bg-[#DDDDDD] text-black py-1.5 rounded-md font-semibold"
                  onClick={() => navigate(`/edit-funding/${item.id}`)}
                >
                  내 등록 수정
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 text-gray-500">
            참여한 펀딩이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFundings;
