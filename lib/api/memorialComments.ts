import axios from 'axios';
import { memorial } from './config';

export interface MemorialComment {
  commentId: number;
  memorialId: number;
  userId: string;
  profileImageUrl?: string;
  content: string;
  likes: number;
  isLiked: boolean;
  parentId: number | null;
  createdAt: string;
  children: MemorialComment[];
}

interface CommentMain {
  hasNext: boolean;
  data: MemorialComment[];
}

interface MemorialCommentsResponse {
  message: string;
  data: CommentMain;
}

interface GetCommentsParams {
  memorialId: number;
  cursorId?: number;
  size?: number;
}

export const getMemorialComments = async ({
  memorialId,
  cursorId,
  size = 10,
}: GetCommentsParams): Promise<MemorialCommentsResponse> => {
  const response = await axios.get(`${memorial}/comment/${memorialId}`, {
    params: {
      ...(cursorId != null ? { cursorId } : {}),
      size,
    },
  });
  return response.data;
};
