import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { queryClient } from "../../App.tsx";
import { QUERY_KEY } from "../../constants/key.ts";

export default function usePostLike() {
  return useMutation({
    mutationFn: postLike,
    // data -> API 성공 응답 데이터
    // variables -> mutate에 전달한 값
    // context -> onMutate에서 반환한 값
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, data.data.lpId],
        exact: true,
      });
    },
    // error -> 요청 실패시 발생한 에러
    // variables -> mutate에 전달한 값
    // context -> onMutate에서 반환한 값
    onError: () => {},
    // 요청 직전에 실행
    // Optimistic Update를 구현할 때 유용
    onMutate: () => {},
    // 요청이 끝난 후 항상 실행(OnSuccess, onError 이후 실행)
    // 로딩 상태를 초기화할때 유용
    onSettled: () => {},
  });
}
