// Common types used across the application
// Reference: OSHI_NO_SAIN/src/modules/

export interface User {
  id: number;
  email: string;
  nickname?: string;
  profileImage?: string;
  createdAt: string;
}

export interface Memorial {
  id: number;
  title: string;
  description: string;
  characterName: string;
  animeId: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  bowCount: number;
}

export interface Anime {
  id: number;
  title: string;
  titleKo?: string;
  imageUrl?: string;
  releaseYear?: number;
}

export interface MemorialApplication {
  id: number;
  characterName: string;
  animeTitle: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  userId: number;
}

export interface Notification {
  id: number;
  title: string;
  content: string;
  is_image: boolean;
  is_open: boolean;
  createdAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
