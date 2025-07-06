import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../../assets/logo_시소.svg";

const IntroPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000); // 3초 후에 로그인 페이지로 이동

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 제거
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <img src={Logo} alt="시소 로고" className="w-28 h-auto mb-4" />
      <p className="text-gray-600 text-sm">
        소외된 사람들에게 시선이 머무르다-
      </p>
    </div>
  );
};

export default IntroPage;
