export type CreateCommentDTO = {
  content: string;
  lpId: number;
};

export type UpdateCommentDTO = {
  content: string;
  lpId: number;
  commentId: number;
};

export type DeleteCommentDTO = {
  lpId: number;
  commentId: number;
};

export type Author = {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Comment = {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  author: Author;
};

export type ResponseComment = {
  data: Comment[];
  nextCursor: string | null;
  hasNext: boolean;
};

export type CommonResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
};

export type ResponseCommentList = CommonResponse<ResponseComment>;
