import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment } from "../../apis/comment";
import { QUERY_KEY } from "../../constants/key";

export default function usePostComment() {
    const queryClient = useQueryClient();

    return useMutation({
    mutationFn: postComment,
    onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.comments, variables.lpId],
        });
    },
    });
}