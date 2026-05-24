/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp.ts";
import { queryClient } from "../../App.tsx";
import { QUERY_KEY } from "../../constants/key.ts";
import type { Likes, ResponseLpDto } from "../../types/lp.ts";
import type { ResponseMyInfoDto } from "../../types/auth.ts";

export default function usePostLike() {
  return useMutation({
    mutationFn: postLike,
    onMutate: async (lp) => {
      // 1. 이 게시글에 관련된 쿼리를 취소 (캐쉬된 데이터를 새로 불러오는 요청)
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.lps, lp.lpId],
      });
      // 2. 현재 게시글의 데이터를 캐시에서 가져오기
      const previousLpPost = queryClient.getQueryData<ResponseLpDto>([
        QUERY_KEY.lps,
        lp.lpId,
      ]);
      // 게시글 데이터를 복사해서 NewLpPost 생성
      // 복사하는 이유: 나중에 오류가 발생했을 때 이전 상태로 되돌리기 위해서
      const NewLpPost = { ...previousLpPost };

      // 게시글에 저장된 좋아요 목록에서 현재 내가 눌렀던 좋아요의 위치 찾기
      const me = queryClient.getQueryData<ResponseMyInfoDto>([
        QUERY_KEY.myInfo,
      ]);
      const userId = Number(me?.data.id);

      const likedIndex =
        previousLpPost?.data.likes.findIndex(
          (like) => like.userId === userId,
        ) ?? -1;

      if (likedIndex >= 0) {
        previousLpPost?.data.likes.splice(likedIndex, 1);
      } else {
        const newLike = { userId, lpId: lp.lpId } as Likes;
        previousLpPost?.data.likes.push(newLike);
      }

      // 업데이트된 게시글 데이터를 캐시에 저장
      // UI가 바로 업데이트. 사용자가 변화 확인 가능
      queryClient.setQueryData([QUERY_KEY.lps, lp.lpId], NewLpPost);

      return { previousLpPost, NewLpPost };
    },
    onError: (err, newLp, context) => {
      console.log(err, newLp);
      queryClient.setQueryData(
        [QUERY_KEY.lps, newLp.lpId],
        context?.previousLpPost?.data.id,
      );
    },
    // onSettled -> API 요청이 끝난후 실행(성공하든 실패하든 실행)
    onSettled: async (data, error, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, variables.lpId],
      });
    },
  });
}
