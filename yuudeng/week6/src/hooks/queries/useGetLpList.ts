import { useQuery } from "@tanstack/react-query";
import type { PaginationDto } from "../../types/common";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

export default function useGetLpList({
  cursor,
  search,
  order,
  limit,
}: PaginationDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, search, order],
    queryFn: () => getLpList({ cursor, search, order, limit }),
    // 데이터가 신선하다고 여겨지는 시간
    staleTime: 100 * 60 * 5, // 5분
    // 사용되지 않는 쿼리 데이터가 캐시에 남아있는 시간
    gcTime: 1000 * 60 * 10, // 10분
    // 조건에 따라 실행 여부 제어
    // enabled: Boolean(search),
    // refetchInterval: 100 * 60,
    // retry: 쿼리 요청이 실패할 때 자동으로 재시도할 횟수
    // initialData: 쿼리 실행 전 미리 제공할 초기 데이터 설정
    // keepPreviousData: 파라미터가 변경될 때 이전 데이터를 유지하여 Flicking을 줄여줌
    select: (data) => data.data.data,
  });
}
