import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchComment } from "../../apis/comment";
import { QUERY_KEY } from "../../constants/key";

export default function usePatchComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchComment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.comments, variables.lpId],
      });
    },
  });
}
