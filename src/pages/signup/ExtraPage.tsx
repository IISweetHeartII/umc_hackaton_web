import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { useSignupStore } from "../../stores/signup";
import { signup } from "../../apis/auth";
import type { SignupRequest } from "../../apis/auth";

const REGION_MAP = {
  SEOUL: "서울특별시",
  BUSAN: "부산광역시",
  DAEGU: "대구광역시",
  INCHEON: "인천광역시",
  GWANGJU: "광주광역시",
  DAEJEON: "대전광역시",
  ULSAN: "울산광역시",
  SEJONG: "세종특별자치시",
  GYEONGGI: "경기도",
  GANGWON: "강원도",
  CHUNGBUK: "충청북도",
  CHUNGNAM: "충청남도",
  JEONBUK: "전라북도",
  JEONNAM: "전라남도",
  GYEONGBUK: "경상북도",
  GYEONGNAM: "경상남도",
  JEJU: "제주특별자치도",
  SUWON: "수원시",
  CHEONGJU: "청주시",
};

const DISABILITY_MAP = {
  DISABLED: "장애인입니다",
  NON_DISABLED: "비장애인입니다",
};

const DISABILITY_TYPE_MAP = {
  PHYSICAL: "지체장애",
  HEARING: "청각장애",
  VISUAL: "시각장애",
  BRAIN_LESION: "뇌병변장애",
  SPEECH: "언어장애",
  FACIAL: "안면장애",
  INTELLECTUAL: "지적장애",
  AUTISM: "자폐성장애",
  MENTAL: "정신장애",
};

const DISABILITY_LEVEL_MAP = {
  SEVERE: "심함",
  MILD: "심하지 않음",
};

const ExtraPage = () => {
  const navigate = useNavigate();
  const signupData = useSignupStore((state) => state);
  const { updateFormData } = signupData;

  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);

  const handleSubmit = async () => {
    const {
      name,
      userId,
      password,
      birthDate,
      region,
      disable,
      disabilityLevel,
      disabilityType,
      profileImage,
    } = signupData;

    const finalDisabilityLevel =
      disable === "DISABLED" ? disabilityLevel : null;
    const finalDisabilityType = disable === "DISABLED" ? disabilityType : null;

    const signupRequest: SignupRequest = {
      name,
      loginId: userId,
      password,
      birth: birthDate,
      region,
      disable,
      hardness: finalDisabilityLevel,
      disableType: finalDisabilityType,
      profileImage,
    };

    console.log("회원가입 요청 데이터:", signupRequest);

    try {
      await signup(signupRequest);
      navigate("/signup/complete");
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const Chip = ({
    label,
    isSelected,
    onClick,
  }: {
    label: string;
    isSelected: boolean;
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-full border transition-colors ${
        isSelected
          ? "bg-[#538E79] text-white border-[#538E79]"
          : "bg-white text-gray-700 border-gray-300"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col h-screen bg-white max-w-md mx-auto p-6">
      <header className="flex items-center mb-8">
        <button onClick={() => navigate(-1)} className="p-1">
          <IoIosArrowBack size={24} />
        </button>
      </header>

      <div className="flex-grow">
        <h1 className="text-2xl font-bold mb-2">드디어 마지막 단계예요</h1>
        <h2 className="text-2xl font-bold mb-8">
          좀 더 자세한 정보가 필요해요!
        </h2>

        <div className="space-y-8">
          <div>
            <label className="text-sm font-semibold mb-2 block">
              어느 지역에 살고 계세요?
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsRegionDropdownOpen((prev) => !prev)}
                className="w-full p-3 border rounded-md focus:outline-none flex justify-between items-center text-left border-gray-300"
              >
                <span
                  className={signupData.region ? "text-black" : "text-gray-400"}
                >
                  {signupData.region
                    ? REGION_MAP[signupData.region as keyof typeof REGION_MAP]
                    : "지역을 선택하세요"}
                </span>
                <IoIosArrowDown
                  className={`transition-transform ${
                    isRegionDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isRegionDropdownOpen && (
                <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {Object.entries(REGION_MAP).map(([key, value]) => (
                    <li
                      key={key}
                      onClick={() => {
                        updateFormData({ region: key });
                        setIsRegionDropdownOpen(false);
                      }}
                      className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      {value}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">
              장애 여부를 선택해주세요.
            </label>
            <div className="flex gap-2">
              {Object.entries(DISABILITY_MAP).map(([key, value]) => (
                <Chip
                  key={key}
                  label={value}
                  isSelected={signupData.disable === key}
                  onClick={() => {
                    if (key === "NON_DISABLED") {
                      updateFormData({
                        disable: key,
                        disabilityLevel: null,
                        disabilityType: null,
                      });
                    } else {
                      updateFormData({ disable: key });
                    }
                  }}
                />
              ))}
            </div>
          </div>

          {signupData.disable === "DISABLED" && (
            <>
              <div>
                <p className="text-sm font-medium mb-2 text-gray-800">
                  장애 정도
                </p>
                <div className="flex gap-2">
                  {Object.entries(DISABILITY_LEVEL_MAP).map(([key, value]) => (
                    <Chip
                      key={key}
                      label={value}
                      isSelected={signupData.disabilityLevel === key}
                      onClick={() => updateFormData({ disabilityLevel: key })}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2 text-gray-800">
                  장애 유형
                </p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(DISABILITY_TYPE_MAP).map(([key, value]) => (
                    <Chip
                      key={key}
                      label={value}
                      isSelected={signupData.disabilityType === key}
                      onClick={() => updateFormData({ disabilityType: key })}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={handleSubmit}
          disabled={!signupData.disable || !signupData.region}
          className={`w-full text-white py-3 rounded-md transition-colors ${
            signupData.disable && signupData.region
              ? "bg-[#538E79] hover:bg-opacity-90"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          저장하기
        </button>
      </div>
    </div>
  );
};

export default ExtraPage;
