import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEyeOff, FiEye } from "react-icons/fi";
import Logo from "../assets/logo_시소.svg";
import { useAuthStore } from "../stores/auth";
import { login } from "../apis/auth"; // API 함수 임포트

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // loginId로 상태 변수 이름 변경 (API 명세와 일치)
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  // [Zustand] setAuth 액션 가져오기 (이름 변경 또는 추가 필요)
  const { setAuth } = useAuthStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // 입력값 검증
    if (!loginId || !password) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      // API 호출
      const loginResult = await login({ loginId, password });

      // [디버깅] API 응답 전체를 콘솔에 출력해서 확인합니다.
      console.log("✅ 로그인 API 응답:", loginResult);

      const { memberId, accessToken } = loginResult;

      // Zustand 스토어에 인증 정보 저장 (memberId를 userId로 전달)
      setAuth(memberId, accessToken);

      // [디버깅] 스토어에 값이 잘 저장되었는지 확인합니다.
      console.log("🔑 Zustand 스토어 상태:", useAuthStore.getState());

      navigate("/home"); // 로그인 성공 시 홈으로 이동
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("아이디 또는 비밀번호가 잘못되었습니다.");
    }
  };

  const handleSignupClick = () => {
    navigate("/signup/terms");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white px-8">
      <img src={Logo} alt="시소 로고" className="w-28 h-auto mb-12" />

      {/* [DEV] 임시 로그인: handleLogin 함수를 form의 onSubmit 이벤트에 연결 */}
      <form className="w-full max-w-sm" onSubmit={handleLogin}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="아이디를 입력하세요."
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#538E79]"
          />
        </div>
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호를 입력하세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#538E79]"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
          >
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </button>
        </div>

        <div className="text-center mb-6">
          <a href="#" className="text-sm text-gray-500 hover:underline">
            비밀번호를 잊어버리셨나요?
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-[#538E79] text-white py-3 rounded-md hover:bg-opacity-90 transition-colors"
        >
          로그인
        </button>

        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-black">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button
          type="button"
          onClick={handleSignupClick}
          className="w-full bg-white text-black border border-[#538E79] py-3 rounded-md hover:bg-gray-50 transition-colors"
        >
          회원가입하기
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
