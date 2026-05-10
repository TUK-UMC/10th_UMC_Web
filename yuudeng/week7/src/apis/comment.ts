import type {
  ResponseCommentList,
  Comment,
  CreateCommentDTO,
  DeleteCommentDTO,
  UpdateCommentDTO,
} from "../types/comment";
import { axiosInstance } from "./axios";

// 댓글 목록 조회
export const getComments = async (
  lpId: number,
  cursor: number | string | null,
  order: "asc" | "desc" = "asc",
): Promise<ResponseCommentList> => {
  const { data } = await axiosInstance.get<ResponseCommentList>(
    `/v1/lps/${lpId}/comments`,
    {
      params: { cursor: cursor ?? undefined, order },
    },
  );

  return data;
};

// 댓글 작성
export const postComment = async (dto: CreateCommentDTO): Promise<Comment> => {
  const { data } = await axiosInstance.post(
    `/v1/lps/${dto.lpId}/comments`,
    dto,
  );

  return data.data;
};

// 댓글 수정
export const patchComment = async (
  dto: UpdateCommentDTO,
): Promise<Comment> => {
  const { data } = await axiosInstance.patch(
    `/v1/lps/${dto.lpId}/comments/${dto.commentId}`,
    {
      content: dto.content,
    },
  );

  return data.data;
};

// 댓글 삭제
export const deleteComment = async ({
  lpId,
  commentId,
}: DeleteCommentDTO): Promise<void> => {
  await axiosInstance.delete(`/v1/lps/${lpId}/comments/${commentId}`);
};
