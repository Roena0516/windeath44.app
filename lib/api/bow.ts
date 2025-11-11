import api from './axiosInstance';
import { memorial, user as userApi } from './config';

// Get total bow count for a memorial
export interface BowCountResponse {
  message: string;
  data: number;
}

export const getBowCount = async (memorialId: number): Promise<BowCountResponse> => {
  const response = await api.get(`${memorial}/bow/count/${memorialId}`);
  return response.data;
};

// Submit a bow (절하기)
export interface BowSubmitResponse {
  message: string;
  data: {
    memorialId: number;
    userId: string;
    bowCount: number;
  };
}

export const submitBow = async (memorialId: number): Promise<BowSubmitResponse> => {
  const response = await api.post(`${memorial}/bow`, { memorialId });
  return response.data;
};

// Get bow chiefs (top mourners) for a memorial
export interface BowChief {
  name: string;
  bowCount: number;
  userId: string;
  profileImageUrl?: string;
}

interface ChiefsResponse {
  message: string;
  data: string[]; // Array of userIds
}

interface UserBowResponse {
  message: string;
  data: {
    userId: string;
    memorialId: number;
    bowCount: number;
  };
}

interface UserData {
  userId: string;
  name: string;
  profileImageUrl?: string;
}

interface UsersResponse {
  message: string;
  data: UserData[];
}

export const getBowChiefs = async (memorialId: number): Promise<BowChief[]> => {
  // Get chief userIds
  const chiefsRes = await api.get<ChiefsResponse>(`${memorial}/chiefs/${memorialId}`);
  const chiefIds = chiefsRes.data.data;

  if (!chiefIds || chiefIds.length === 0) {
    return [];
  }

  // Get bow counts for each chief
  const bowResults = await Promise.all(
    chiefIds.map((userId) =>
      api.get<UserBowResponse>(`${memorial}/bow/${userId}/${memorialId}`)
    )
  );

  // Get user details
  const userIds = chiefIds.join(',');
  const usersRes = await api.get<UsersResponse>(`${userApi}`, {
    params: { userIds: chiefIds },
    paramsSerializer: (params) => {
      const userIdArray = params.userIds;
      return userIdArray.map((id: string) => `userIds=${id}`).join('&');
    },
  });

  // Merge data
  const chiefs: BowChief[] = bowResults
    .filter((res) => res.data.data)
    .map((res) => {
      const bowData = res.data.data;
      const userData = usersRes.data.data.find((u) => u.userId === bowData.userId);
      return {
        userId: bowData.userId,
        name: userData?.name || 'Unknown',
        bowCount: bowData.bowCount,
        profileImageUrl: userData?.profileImageUrl,
      };
    });

  return chiefs;
};

// Check if user has bowed today
export const checkUserBow = async (
  memorialId: number,
  userId: string
): Promise<UserBowResponse> => {
  const response = await api.get(`${memorial}/bow/${userId}/${memorialId}`);
  return response.data;
};
