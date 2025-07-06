import axios from "./axios";

export type UserInfo = {
  userId: number;
  name: string;
  loginId: string;
  birth: string;
  disableType: string;
  hardness: string;
  regionName: string;
  profileImage?: string;
};

export type UpdateUserInfoPayload = {
  name: string;
  birth: string;
  hardness: string;
  disableType: string;
  disable: string;
  region: string;
};

export async function fetchMyInfo(): Promise<UserInfo> {
  const res = await axios.get("/users/info");
  if (!res.data.isSuccess)
    throw new Error(res.data.message || "유저 정보 불러오기 실패");
  return res.data.result as UserInfo;
}

// 회원정보 수정
export async function updateMyInfo(payload: Partial<UpdateUserInfoPayload>) {
  const res = await axios.patch("/users/", payload);
  if (!res.data.isSuccess) {
    throw new Error(res.data.message || "회원정보 수정 실패");
  }
  return res.data.result;
}

// 프로필 이미지 수정 (base64 or url)
export async function updateProfileImage(profileImage: string) {
  const res = await axios.patch("/users/profile-image", { profileImage });
  if (!res.data.isSuccess) {
    throw new Error(res.data.message || "프로필 이미지 수정 실패");
  }
  return res.data.result;
}

// 프로필 이미지 삭제
export async function deleteProfileImage() {
  const res = await axios.delete("/users/profile-image");
  if (!res.data.isSuccess) {
    throw new Error(res.data.message || "프로필 이미지 삭제 실패");
  }
  return res.data.result;
}
