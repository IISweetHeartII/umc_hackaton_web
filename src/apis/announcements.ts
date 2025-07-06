import api from "./index";

export interface Announcement {
  id: number;
  infoType: string;
  region: string;
  target: string;
  remainPeriod: number;
  title: string;
  institute: string;
  openDate: string;
}

interface AnnouncementsResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Announcement[];
}

// 공고 리스트 가져오기 (type: 필수)
export async function fetchAnnouncements(params: {
  type: string; // HOUSE, LOAN, REPAIRMENT, COMFORTS 등
  isRecruiting?: boolean;
  region?: string;
  target?: string;
}) {
  const { data } = await api.get<AnnouncementsResponse>("/announcements/", {
    params,
  });
  return data.result;
}
