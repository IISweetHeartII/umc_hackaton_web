import { useNavigate } from "react-router-dom";
import completePageIcon from "../../assets/completePage-icon.svg";
import { useSignupStore } from "../../stores/signup";

const CompletePage = () => {
  const navigate = useNavigate();
  const resetSignupStore = useSignupStore((state) => state.reset);

  const handleNavigateToLogin = () => {
    resetSignupStore();
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-screen bg-white max-w-md mx-auto p-6 justify-between">
      <div />
      <div className="flex flex-col items-center text-center">
        <div className="mb-8 w-40 h-40 bg-[#EAF0ED] rounded-full flex items-center justify-center">
          <img src={completePageIcon} alt="가입 완료 아이콘" className="w-24" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">축하합니다!</h1>
        <p className="text-xl text-gray-700 mt-4">가입을 완료했어요</p>
      </div>

      <div className="w-full">
        <button
          onClick={handleNavigateToLogin}
          className="w-full text-white py-3 rounded-md bg-[#538E79] hover:bg-opacity-90 transition-colors"
        >
          로그인하고 시작하기
        </button>
      </div>
    </div>
  );
};

export default CompletePage;
