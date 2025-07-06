import { useNavigate } from "react-router-dom";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRef } from "react";
import { FaCamera } from "react-icons/fa";
import { useSignupStore } from "../../stores/signup";
import { IoIosArrowBack } from "react-icons/io";

const profileSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요."),
  birthDate: z.string().min(1, "생년월일을 입력해주세요."),
});

type ProfileFormInputs = z.infer<typeof profileSchema>;

const ProfilePage = () => {
  const navigate = useNavigate();
  const { name, birthDate, profileImage, updateFormData } = useSignupStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ProfileFormInputs>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      name: name,
      birthDate: birthDate,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const pureBase64 = base64String.split(",")[1];
        updateFormData({
          profileImage: pureBase64,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit: SubmitHandler<ProfileFormInputs> = (data) => {
    updateFormData({ name: data.name, birthDate: data.birthDate });
    navigate("/signup/extra");
  };

  return (
    <div className="flex flex-col h-screen bg-white max-w-md mx-auto p-6">
      <header className="mb-8">
        <button onClick={() => navigate(-1)} className="p-1">
          <IoIosArrowBack size={24} />
        </button>
      </header>
      <div className="flex-grow">
        <h1 className="text-2xl font-bold mb-8">
          프로필 사진과 생일을 설정해주세요
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex justify-center">
            <div className="relative">
              <div
                className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden"
                onClick={handleImageUploadClick}
              >
                {profileImage ? (
                  <img
                    src={`data:image/jpeg;base64,${profileImage}`}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaCamera className="text-gray-500 text-4xl" />
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />
              <button
                type="button"
                onClick={handleImageUploadClick}
                className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md"
              >
                <FaCamera className="text-gray-600" />
              </button>
            </div>
          </div>

          <div>
            <label className="font-bold text-gray-700">이름</label>
            <input
              type="text"
              {...register("name")}
              placeholder="이름을 입력해주세요."
              className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#538E79]"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="font-bold text-gray-700">
              생년월일을 알려주세요!
            </label>
            <input
              type="date"
              {...register("birthDate")}
              className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#538E79]"
            />
            {errors.birthDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.birthDate.message}
              </p>
            )}
          </div>

          <div className="pt-8">
            <button
              type="submit"
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
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
