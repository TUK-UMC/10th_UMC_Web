import type { PaginationDto } from "../types/common.types";

export const getLpList = async (
    paginationDto: PaginationDto
) :Promise<ResponseLpListDto>=> {
    const{data} = await axioslnstance.get("/v1/lps", {
        params: paginationDto,
    });

    return data;
};

