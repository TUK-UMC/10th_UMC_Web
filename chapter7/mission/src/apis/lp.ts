import type {
    RequestLpCreateDto,
    RequestLpDto,
    ResponseLikeLpDto,
    ResponseLpDto,
    ResponseLpListDto,
} from "../types/lp";
import type { PaginationDto } from "./../types/common";
import { axiosInstance } from "./axios";

export const getLpList = async (
    paginationDto: PaginationDto,
): Promise<ResponseLpListDto> => {
    const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
    });
    return data;
};

export const postLp = async (
    dto: RequestLpCreateDto,
): Promise<ResponseLpDto> => {
    const { data } = await axiosInstance.post("/v1/lps", {
    title: dto.title,
    content: dto.content,
    thumbnail: dto.thumbnail as unknown as string,
    tags: dto.tags,
    published: true,
    });
    return data;
};

export const patchLp = async (
    dto: RequestLpCreateDto & { lpId: number },
): Promise<ResponseLpDto> => {
    const { data } = await axiosInstance.patch(`/v1/lps/${dto.lpId}`, {
    title: dto.title,
    content: dto.content,
    thumbnail: dto.thumbnail as unknown as string,
    tags: dto.tags,
    published: true,
    });
    return data;
};

export const deleteLp = async ({ lpId }: RequestLpDto): Promise<void> => {
    await axiosInstance.delete(`/v1/lps/${lpId}`);
};

export const uploadLpImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await axiosInstance.post("/v1/uploads", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    });

    return data.data.imageUrl;
};

export const getLpDetail = async ({
    lpId,
}: RequestLpDto): Promise<ResponseLpDto> => {
    const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);

    return data;
};

export const postLike = async ({
    lpId,
}: RequestLpDto): Promise<ResponseLikeLpDto> => {
    const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);

    return data;
};

export const deleteLike = async ({
    lpId,
}: RequestLpDto): Promise<ResponseLikeLpDto> => {
    const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);
    return data;
};