import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchLp } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import type { ResponseLpDto } from "../../types/lp";

export default function usePatchLp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchLp,
    onSuccess: (response, variables) => {
      queryClient.setQueryData<ResponseLpDto>(
        [QUERY_KEY.lps, variables.lpId],
        (previous) => {
          if (!previous) {
            return response;
          }

          return {
            ...previous,
            ...response,
            data: {
              ...previous.data,
              ...response.data,
              tags: response.data.tags ?? previous.data.tags,
              likes: response.data.likes ?? previous.data.likes,
              author: response.data.author ?? previous.data.author,
            },
          };
        },
      );
    },
  });
}
