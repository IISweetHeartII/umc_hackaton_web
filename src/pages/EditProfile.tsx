import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backIcon from "../assets/backButton.svg";
import { FiImage } from "react-icons/fi";
import {
  fetchMyInfo,
  updateMyInfo,
  updateProfileImage,
  deleteProfileImage,
  type UpdateUserInfoPayload,
  type UserInfo,
} from "../apis/user";

// --- 데이터 매핑 ---
const KOREAN_TO_DISABILITY_TYPE: { [key: string]: string } = {
  지체장애: "PHYSICAL",
  청각장애: "HEARING",
  시각장애: "VISUAL",
  뇌병변장애: "BRAIN_LESION",
  언어장애: "SPEECH",
  안면장애: "FACIAL",
  지적장애: "INTELLECTUAL",
  자폐성장애: "AUTISM",
  정신장애: "MENTAL",
};
const DISABILITY_TYPE_TO_KOREAN = Object.fromEntries(
  Object.entries(KOREAN_TO_DISABILITY_TYPE).map(([k, v]) => [v, k])
);
const disabilityTypes = Object.keys(KOREAN_TO_DISABILITY_TYPE);

const KOREAN_TO_HARDNESS: { [key: string]: string } = {
  "정도가 심함": "SEVERE",
  "정도가 심하지 않음": "MILD",
};
const HARDNESS_TO_KOREAN = Object.fromEntries(
  Object.entries(KOREAN_TO_HARDNESS).map(([k, v]) => [v, k])
);
const disabilityLevels = Object.keys(KOREAN_TO_HARDNESS);

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

const EditProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [initialUser, setInitialUser] = useState<UserInfo | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showImageMenu, setShowImageMenu] = useState(false);
  const [name, setName] = useState("");
  const [region, setRegion] = useState("SEOUL");
  const [birth, setBirth] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyInfo()
      .then((user) => {
        setInitialUser(user);
        setName(user.name);
        setRegion(user.regionName || "SEOUL");
        setBirth(user.birth.split("T")[0]);
        setProfileImage(
          user.profileImage
            ? `data:image/jpeg;base64,${user.profileImage}`
            : null
        );
        setSelectedTypes(
          user.disableType && user.disableType !== "NON_DISABLED"
            ? [DISABILITY_TYPE_TO_KOREAN[user.disableType]]
            : []
        );
        setSelectedLevel(
          user.hardness && user.hardness !== "NONE"
            ? HARDNESS_TO_KOREAN[user.hardness]
            : ""
        );
      })
      .catch((e: Error) =>
        alert(e.message || "사용자 정보를 불러오지 못했습니다.")
      )
      .finally(() => setLoading(false));
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64ImageWithPrefix = event.target?.result as string;
        if (base64ImageWithPrefix) {
          const pureBase64 = base64ImageWithPrefix.split(",")[1];
          await updateProfileImage(pureBase64); // 순수 base64 데이터 전송
          setProfileImage(base64ImageWithPrefix); // UI는 전체 데이터 URL 사용
          alert("프로필 이미지가 변경되었습니다.");
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      alert("이미지 업로드에 실패했습니다.");
    } finally {
      setShowImageMenu(false);
      e.target.value = "";
    }
  };

  const handleImageDelete = async () => {
    try {
      await deleteProfileImage();
      setProfileImage(null);
      alert("기본 이미지로 변경되었습니다.");
    } catch (error) {
      console.error("이미지 삭제 실패:", error);
      alert("이미지 삭제에 실패했습니다.");
    } finally {
      setShowImageMenu(false);
    }
  };

  // 외부 클릭 시 팝오버 닫기
  useEffect(() => {
    if (!showImageMenu) return;
    const handler = (e: MouseEvent) => {
      const menu = document.getElementById("profile-image-menu");
      if (menu && !menu.contains(e.target as Node)) {
        setShowImageMenu(false);
      }
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, [showImageMenu]);

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) => (prev.includes(type) ? [] : [type]));
  };

  const handleSave = async () => {
    if (!initialUser) return;

    const payload: Partial<UpdateUserInfoPayload> = {};

    if (name !== initialUser.name) payload.name = name;
    if (birth !== initialUser.birth.split("T")[0]) payload.birth = birth;
    if (region !== initialUser.regionName) payload.region = region;

    const newDisableType = selectedTypes.length
      ? KOREAN_TO_DISABILITY_TYPE[selectedTypes[0]]
      : "NON_DISABLED";
    const newHardness = selectedLevel
      ? KOREAN_TO_HARDNESS[selectedLevel]
      : "NONE";

    if (newDisableType !== initialUser.disableType) {
      payload.disableType = newDisableType;
      payload.disable =
        newDisableType === "NON_DISABLED" ? "NON_DISABLED" : "DISABLED";
    }

    if (newHardness !== initialUser.hardness) {
      payload.hardness = newHardness;
    }

    if (Object.keys(payload).length === 0) {
      alert("수정된 내용이 없습니다.");
      return;
    }

    try {
      await updateMyInfo(payload);
      alert("프로필이 성공적으로 수정되었습니다.");
      navigate("/mypage");
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message || "프로필 수정에 실패했습니다.");
      } else {
        alert("알 수 없는 오류로 프로필 수정에 실패했습니다.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        로딩 중...
      </div>
    );
  }

  return (
    <div className="max-w-[400px] mx-auto p-4 bg-white min-h-screen text-sm relative">
      <button onClick={() => navigate(-1)} className="absolute left-4 top-4">
        <img src={backIcon} alt="뒤로가기" className="w-6 h-6" />
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      {/* 숨겨진 파일 인풋은 팝오버 바깥에 둬야 안정적으로 동작 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      {/* 프로필 사진 중앙 정렬 */}
      <div className="flex flex-col items-center mt-14 mb-4 relative">
        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
          {profileImage ? (
            <img
              src={profileImage}
              alt="profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <FiImage className="w-12 h-12 text-gray-400" />
          )}
        </div>
        {/* 갤러리 아이콘 (프로필 오른쪽 하단에 겹치게) */}
        <button
          type="button"
          className="absolute right-[calc(50%-48px)] bottom-0 translate-x-1/2 translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow cursor-pointer"
          onClick={() => setShowImageMenu((v) => !v)}
          aria-label="사진 선택 메뉴"
        >
          <FiImage className="w-6 h-6 text-gray-600" />
        </button>
        {/* 팝오버 메뉴 */}
        {showImageMenu && (
          <div
            id="profile-image-menu"
            className="absolute left-1/2 top-full mt-3 z-10 min-w-[160px] bg-white border border-gray-200 rounded-xl shadow-md p-2 flex flex-col"
            style={{ transform: "translateX(-50%)" }}
          >
            <button
              className={`text-gray-700 font-medium flex items-center justify-between px-2 py-2 text-sm rounded hover:bg-gray-50 ${
                !profileImage ? "text-[#649F87] font-bold" : ""
              }`}
              onClick={handleImageDelete}
            >
              기본 이미지
              {!profileImage && <span className="ml-2 text-lg">✓</span>}
            </button>
            <button
              className="text-gray-700 font-medium px-2 py-2 text-sm rounded hover:bg-gray-50 flex items-center"
              onClick={() => {
                setShowImageMenu(false);
                fileInputRef.current?.click();
              }}
            >
              앨범에서 선택
            </button>
          </div>
        )}
      </div>

      <label className="block mb-1 font-bold text-base">사용자 이름</label>
      <input
        type="text"
        className="w-full border border-gray-300 p-2 mb-4 bg-white-50 text-base rounded-lg"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label className="block mb-1 font-bold text-base">거주 지역</label>
      <div className="relative mb-4">
        <select
          className="w-full border border-gray-300 p-2 pr-8 rounded-lg bg-white text-base appearance-none"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          style={{ fontSize: "16px" }}
        >
          {Object.entries(REGION_MAP).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
        {/* ▼ */}
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-500">
          ▼
        </span>
      </div>

      {/* 생년월일 */}
      <label className="block mb-1 font-bold text-base">
        생년월일을 알려주세요!
      </label>
      <div className="relative mb-6">
        <input
          type="date"
          className="w-full border border-gray-300 p-2 rounded-lg bg-white-50 text-base appearance-none"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          {/* 캘린더 아이콘 */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          ></svg>
        </span>
      </div>

      <div className="mb-1 font-bold text-base">
        본인의 장애 종류를 체크해주세요.
      </div>
      <p className="text-gray-500 text-xs mb-1">
        공식적인 기준을 따라서 체크해주세요!
      </p>
      <p className="text-gray-500 text-xs mb-2">장애 유형 (중복 선택 가능)</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {disabilityTypes.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => handleTypeToggle(type)}
            className={`px-3 py-1 rounded-[10px] text-sm border font-medium
              ${
                selectedTypes.includes(type)
                  ? "bg-[#D3EDE4] border-[#538E79] text-[#538E79]"
                  : "bg-white border-[#538E79]-300 text-[#538E79]"
              }
            `}
          >
            {type}
          </button>
        ))}
      </div>

      <p className="text-gray-500 text-xs mb-1">장애 경도</p>
      <div className="flex gap-2 mb-8">
        {disabilityLevels.map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => setSelectedLevel(level)}
            className={`px-3 py-1 rounded-[10px] text-sm border font-medium
              ${
                selectedLevel === level
                  ? "bg-[#D3EDE4] border-[#538E79] text-[#538E79]"
                  : "bg-white border-[#538E79]-300 text-[#538E79]"
              }
            `}
          >
            {level}
          </button>
        ))}
      </div>

      <button
        onClick={handleSave}
        className="w-full bg-[#74947B] text-white py-3 rounded-md text-base font-bold"
      >
        수정사항 저장
      </button>
    </div>
  );
};
export default EditProfile;
