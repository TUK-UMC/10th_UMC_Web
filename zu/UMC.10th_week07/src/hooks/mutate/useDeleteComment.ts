import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../../apis/comment";
import { QUERY_KEY } from "../../constants/key";

export default function useDeleteComment() {
    const queryClient = useQueryClient();

    return useMutation({
    mutationFn: deleteComment,
    onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.comments, variables.lpId],
        });
    },
    });
}