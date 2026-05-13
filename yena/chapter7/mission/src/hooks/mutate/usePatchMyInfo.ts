import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchMyInfo } from "../../apis/auth";
import { QUERY_KEY } from "../../constants/key";

export default function usePatchMyInfo() {
    const queryClient = useQueryClient();

    return useMutation({
    mutationFn: patchMyInfo,
    onSuccess: (response) => {
        queryClient.setQueryData([QUERY_KEY.myInfo], response);
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });
    },
    });
}