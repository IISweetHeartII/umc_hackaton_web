import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';

const dummyFundings: Record<number, { title: string; options: string[] }> = {
  1: {
    title: '욕실 미끄럼 방지 매트',
    options: ['핑크색 방지 매트', '민트색 방지 매트', '화이트 방지 매트'],
  },
  2: {
    title: '기타 펀딩 제품',
    options: ['기본 옵션'],
  },
};

const EditFunding = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const funding = dummyFundings[Number(id)] || dummyFundings[1];

  // 셀렉트 옵션
  const [selectedOption, setSelectedOption] = useState(funding.options[0]);
  // 수량
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = () => {
    alert('수정이 완료되었습니다!');
    navigate('/my-fundings');
  };

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
        <h1 className="text-[22px] font-bold tracking-tight">등록 수정하기</h1>
      </div>

      {/* 제품명 */}
      <div className="text-lg font-bold mb-6">{funding.title}</div>

      {/* 나의 수량 */}
      <div className="text-base font-semibold mb-2">나의 수량</div>

      {/* 옵션 셀렉트 */}
      <div className="relative mb-4 w-64 max-w-full">
        <select
          className="w-full border border-gray-300 rounded-lg p-2 pr-8 text-base appearance-none"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          {funding.options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-2xl text-gray-500">
          ▼
        </span>
      </div>

      {/* 수량 선택 */}
      <div className="flex items-center gap-2 mb-8">
        <button
          className="w-10 h-10 border rounded-md text-2xl font-bold flex items-center justify-center"
          onClick={() => setQuantity(q => Math.max(1, q - 1))}
          aria-label="수량 감소"
        >－</button>
        <span className="w-10 text-center text-lg">{quantity}</span>
        <button
          className="w-10 h-10 border rounded-md text-2xl font-bold flex items-center justify-center"
          onClick={() => setQuantity(q => q + 1)}
          aria-label="수량 증가"
        >＋</button>
      </div>

      {/* 완료 버튼 */}
      <button
        onClick={handleSubmit}
        className="w-full bg-[#538E79] text-white py-3 rounded-lg font-bold text-base"
      >
        완료
      </button>
    </div>
  );
};

export default EditFunding;
