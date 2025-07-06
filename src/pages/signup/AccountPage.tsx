import { useNavigate } from "react-router-dom";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { IoIosArrowBack } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useSignupStore } from "../../stores/signup";

const accountSchema = z
  .object({
    userId: z.string().min(1, "아이디를 입력해주세요."),
    password: z.string().min(8, "영문/숫자/특수기호 조합 8자 이상"),
    confirmPassword: z.string().min(8, "비밀번호를 다시 입력해주세요."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

type AccountFormInputs = z.infer<typeof accountSchema>;

const AccountPage = () => {
  const navigate = useNavigate();
  const { userId, password, updateFormData } = useSignupStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AccountFormInputs>({
    resolver: zodResolver(accountSchema),
    mode: "onChange",
    defaultValues: {
      userId: userId,
      password: password,
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<AccountFormInputs> = (data) => {
    updateFormData({ userId: data.userId, password: data.password });
    navigate("/signup/profile");
  };

  return (
    <div className="flex flex-col h-screen bg-white max-w-md mx-auto p-6">
      <header className="flex items-center mb-8">
        <button onClick={() => navigate(-1)} className="p-1">
          <IoIosArrowBack size={24} />
        </button>
      </header>

      <div className="flex-grow">
        <h1 className="text-2xl font-bold mb-8">
          앱에 들어올 때<br />
          사용할 계정 정보를 설정해주세요
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="text-sm font-semibold mb-2 block">
              사용자 아이디
            </label>
            <div className="relative">
              <input
                {...register("userId")}
                placeholder="프로필에 노출되며, 추후 변경 가능해요!"
                className={`w-full p-3 pr-24 border rounded-md focus:outline-none ${
                  errors.userId
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-2 focus:ring-[#538E79]"
                }`}
              />
              <button
                type="button"
                className="absolute top-1/2 transform -translate-y-1/2 right-2 bg-[#EAF0ED] text-[#538E79] text-xs px-3 py-1.5 rounded-md font-semibold"
              >
                중복체크
              </button>
            </div>
            {errors.userId && (
              <p className="text-red-500 text-xs mt-1">
                {errors.userId.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">비밀번호</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="영문/숫자/특수기호 조합 8자 이상"
                className={`w-full p-3 border rounded-md focus:outline-none ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-2 focus:ring-[#538E79]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">
              비밀번호 재입력
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                placeholder="비밀번호를 다시 입력해주세요."
                className={`w-full p-3 border rounded-md focus:outline-none ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-2 focus:ring-[#538E79]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-500"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </form>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid}
          className={`w-full text-white py-3 rounded-md transition-colors ${
            isValid
              ? "bg-[#538E79] hover:bg-opacity-90"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
