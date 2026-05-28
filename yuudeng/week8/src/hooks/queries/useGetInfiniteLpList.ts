import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import type { PAGINATION_ORDER } from "../../enums/common";
import { QUERY_KEY } from "../../constants/key";

export default function useGetInfiniteLpList(
  limit: number,
  search: string,
  order: PAGINATION_ORDER,
  type: "title" | "tag",
) {
  const trimmedSearch = search.trim();

  return useInfiniteQuery({
    queryKey: [QUERY_KEY.lps, search, order],
    queryFn: ({ pageParam }) =>
      getLpList({
        cursor: pageParam,
        limit,
        search: trimmedSearch,
        order,
        type,
      }),
    enabled: trimmedSearch.length > 0,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
  });
}
