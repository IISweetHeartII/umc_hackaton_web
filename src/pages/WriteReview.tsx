import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import {
  getFundingDetail,
  createReview,
  type FundingItem,
} from "../apis/purchase";

const WriteReview = () => {
  const { id: pageId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [funding, setFunding] = useState<FundingItem | null>(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (pageId) {
      const numericId = parseInt(pageId, 10);
      getFundingDetail(numericId)
        .then(setFunding)
        .catch((err) => {
          console.error(err);
          alert("펀딩 정보를 불러오는데 실패했습니다.");
          navigate(-1);
        });
    }
  }, [pageId, navigate]);

  const handleSubmit = async () => {
    if (!funding || !content.trim()) {
      alert("기대평을 입력해주세요.");
      return;
    }

    try {
      await createReview({
        id: funding.id,
        content: content,
      });
      alert("기대평이 성공적으로 등록되었습니다!");
      navigate(`/purchase/${funding.id}`);
    } catch (err) {
      console.error(err);
      alert("기대평 등록에 실패했습니다.");
    }
  };

  if (!funding) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>펀딩 정보를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-7 bg-white min-h-screen">
      {/* 상단 바 */}
      <div className="relative flex items-center justify-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 top-1 text-2xl text-black p-1"
        >
          <FiChevronLeft className="w-7 h-7" />
        </button>
        <h1 className="text-[22px] font-bold tracking-tight">기대평 남기기</h1>
      </div>

      {/* 제품명 */}
      <div className="text-lg font-bold mb-2">{funding.name}</div>

      {/* 기대평 입력창 */}
      <textarea
        className="w-full h-28 border rounded-xl p-4 resize-none mb-6 text-base focus:outline-[#6B8F7B] placeholder:text-gray-400"
        placeholder="기대평을 작성해 주세요!"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={300}
      />

      {/* 완료 버튼 */}
      <button
        onClick={handleSubmit}
        className="w-full bg-[#538E79] text-white py-3 rounded-lg font-bold text-base disabled:bg-gray-400"
        disabled={!content.trim()}
      >
        완료
      </button>
    </div>
  );
};

export default WriteReview;
