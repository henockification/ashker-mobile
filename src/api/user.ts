import { apiClient } from '@/src/api/client';
import {
  UserProfile
} from '@/src/types/user';

export const getUserProfile = async (userId: number): Promise<UserProfile> => {
  const { data } = await apiClient.get<UserProfile>(`user-personal/${userId}`);
  return data;
};