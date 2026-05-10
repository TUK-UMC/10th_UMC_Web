import { useInfiniteQuery } from "@tanstack/react-query";
import { getComments } from "../../apis/comment";
import { QUERY_KEY } from "../../constants/key";
import type { PAGINATION_ORDER } from "../../enums/common";

export default function useGetInfiniteComments(
  lpId: number,
  order: PAGINATION_ORDER,
) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.comments, lpId, order],
    queryFn: ({ pageParam }) => getComments(lpId, pageParam, order),
    enabled: Number.isFinite(lpId),
    initialPageParam: null as number | string | null,
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
  });
}
