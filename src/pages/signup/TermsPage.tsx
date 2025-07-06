import { useNavigate } from "react-router-dom";
import { IoCheckmark } from "react-icons/io5";
import { useSignupStore } from "../../stores/signup";

const TermsPage = () => {
  const navigate = useNavigate();
  const {
    termsOfService,
    privacyPolicy,
    age,
    marketing,
    push,
    updateFormData,
  } = useSignupStore();

  const allAgreements = { termsOfService, privacyPolicy, age, marketing, push };
  const isAllChecked = Object.values(allAgreements).every(Boolean);

  const requiredAgreed = termsOfService && privacyPolicy && age;

  const handleCheckboxChange = (name: keyof typeof allAgreements | "all") => {
    if (name === "all") {
      const newValue = !isAllChecked;
      updateFormData({
        termsOfService: newValue,
        privacyPolicy: newValue,
        age: newValue,
        marketing: newValue,
        push: newValue,
      });
    } else {
      updateFormData({ [name]: !allAgreements[name] });
    }
  };

  const Checkbox = ({
    id,
    checked,
    label,
    isRequired,
    hasView = false,
  }: {
    id: keyof typeof allAgreements;
    checked: boolean;
    label: string;
    isRequired: boolean;
    hasView?: boolean;
  }) => (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <button
          onClick={() => handleCheckboxChange(id)}
          className={`w-5 h-5 rounded-sm flex items-center justify-center mr-3 transition-colors ${
            checked ? "bg-[#D9E4E0]" : "bg-gray-200"
          }`}
        >
          {checked && <IoCheckmark className="text-[#538E79]" />}
        </button>
        <label className="text-gray-800">
          <span className={isRequired ? "font-bold" : ""}>{`[${
            isRequired ? "필수" : "선택"
          }]`}</span>{" "}
          {label}
        </label>
      </div>
      {hasView && (
        <a href="#" className="text-sm text-gray-500 hover:underline">
          보기
        </a>
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-white max-w-md mx-auto p-6">
      <div className="flex-grow">
        <h1 className="text-2xl font-bold mb-8">
          서비스 이용을 위해
          <br />
          약관에 동의해주세요
        </h1>

        <div className="flex items-center mb-6 p-4 bg-gray-50 rounded-lg">
          <button
            onClick={() => handleCheckboxChange("all")}
            className={`w-6 h-6 rounded-md flex items-center justify-center mr-4 transition-colors ${
              isAllChecked ? "bg-[#D9E4E0]" : "bg-gray-200"
            }`}
          >
            {isAllChecked && (
              <IoCheckmark size={20} className="text-[#538E79]" />
            )}
          </button>
          <label className="text-lg font-bold text-gray-900">
            전체 약관에 동의합니다
          </label>
        </div>

        <div className="space-y-4">
          <Checkbox
            id="termsOfService"
            checked={termsOfService}
            label="서비스 이용약관 동의"
            isRequired={true}
            hasView={true}
          />
          <Checkbox
            id="privacyPolicy"
            checked={privacyPolicy}
            label="개인정보 처리방침 동의"
            isRequired={true}
            hasView={true}
          />
          <Checkbox
            id="age"
            checked={age}
            label="만 14세 이상입니다"
            isRequired={true}
          />
          <Checkbox
            id="marketing"
            checked={marketing}
            label="마케팅 정보 수신 동의"
            isRequired={false}
            hasView={true}
          />
          <Checkbox
            id="push"
            checked={push}
            label="푸시 알림 수신 동의"
            isRequired={false}
          />
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
          <ul className="list-disc list-inside space-y-2">
            <li>안전한 커뮤니티를 위한 조치</li>
            <li>실명 및 학교 인증이 완료된 사용자만 이용 가능</li>
            <li>부적절한 활동은 계정 제한 및 법적 조치를 받을 수 있음</li>
            <li>개인정보 보호를 위해 연락처 교환은 서비스 내 기능을 이용</li>
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={() => navigate("/signup/account")}
          disabled={!requiredAgreed}
          className={`w-full text-white py-3 rounded-md transition-colors ${
            requiredAgreed
              ? "bg-[#538E79] hover:bg-opacity-90"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          동의하고 계속하기
        </button>
      </div>
    </div>
  );
};

export default TermsPage;
