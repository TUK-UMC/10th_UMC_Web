import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { LpCard } from "../components/LpCard/LpCard";
import { PAGINATION_ORDER } from "../enums/common";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { LpCardSkeletonList } from "../components/LpCard/LpCardSkeletonList";
import useDebounce from "../hooks/useDebounce";
import { SEARCH_DEBOUNCE_DELAY } from "../constants/delay";
import { Search } from "lucide-react";
import useThrottle from "../hooks/useThrottle";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState<"title" | "tag">("title");
  const [order, setOrder] = useState(PAGINATION_ORDER.desc);
  const debouncedValue = useDebounce(search, SEARCH_DEBOUNCE_DELAY);

  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(20, debouncedValue, order, searchType);

  // ref : 특정한 HTML 요소를 감시
  // inView: 그 요소가 화면에 보이면 true
  const { ref, inView } = useInView({ threshold: 0 });
  const throttledInView = useThrottle(inView, 800);

  useEffect(() => {
    if (throttledInView && !isFetching && hasNextPage) {
      void fetchNextPage();
    }
  }, [throttledInView, isFetching, hasNextPage, fetchNextPage]);

  if (isError) {
    return <div className="mt-20">Error</div>;
  }

  return (
    <>
      <div className="container m-auto px-4 py-4">
        <div className="flex items-center justify-center gap-2 dark:text-white">
          <div className="flex items-center border-b-2 dark:border-white">
            <Search />
            <input
              className="flex items-center justify-center w-130 p-3"
              value={search}
              placeholder="검색어를 입력하세요."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="border-2 rounded-xl px-8 py-2 appearance-none"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value as "title" | "tag")}
          >
            <option value="title">제목</option>
            <option value="tag">태그</option>
          </select>
        </div>
        <div className="flex border border-black dark:border-white w-fit justify-end mx-4 mb-4 rounded-lg overflow-hidden ml-auto">
          <button
            onClick={() => setOrder(PAGINATION_ORDER.asc)}
            className={`px-4 py-2 ${
              order === PAGINATION_ORDER.asc
                ? "bg-white text-black dark:bg-black dark:text-white"
                : "bg-black text-white dark:bg-white dark:text-black"
            }`}
          >
            오래된순
          </button>
          <button
            onClick={() => setOrder(PAGINATION_ORDER.desc)}
            className={`px-4 py-2 ${
              order === PAGINATION_ORDER.desc
                ? "bg-white text-black dark:bg-black dark:text-white"
                : "bg-black text-white dark:bg-white dark:text-black"
            }`}
          >
            최신순
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {isPending && <LpCardSkeletonList count={20} />}
          {lps?.pages
            ?.map((page) => page.data.data)
            ?.flat()
            ?.map((lp) => (
              <LpCard key={lp.id} lp={lp} />
            ))}
          {!isFetching && <LpCardSkeletonList count={0} />}
        </div>
        <div ref={ref} className="h-2"></div>
      </div>
    </>
  );
};

export default HomePage;
