import type { CommonResponse, CursorBasedResponse } from "./common";

export type Tag = {
    id: number;
    name: string;
};

export type Likes = {
    id: number;
    userId: number;
    lpId: number;
};

export type LpAuthor = {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
};

export type Lp = {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
    tags: Tag[];
    likes: Likes[];
    author?: LpAuthor;
};

export type RequestLpCreateDto = {
    title: string;
    content: string;
    thumbnail: string;
    tags: string[];
};

export type RequestLpDto = {
    lpId: number;
};

export type ResponseLpDto = CommonResponse<Lp>;

export type ResponseLpListDto = CursorBasedResponse<Lp[]>;

export type ResponseLikeLpDto = CommonResponse<{
    id: number;
    userId: number;
    lpId: number;
}>;