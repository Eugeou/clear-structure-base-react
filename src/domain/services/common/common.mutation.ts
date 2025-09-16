/**
 * Common query
 */

import { useMutation } from "@/infrastructure/plugins/tanstack";
import { useQueryClient } from "@tanstack/react-query";
import { type ICommonService } from "./common.interface";

const QUERY_SERVICE_ID = "common";

const setItem = (service: ICommonService) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { key: string, value: string }) => service.setItem(data.key, data.value),
        options: {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [QUERY_SERVICE_ID, "getKeys"] });
            },
        },
    });
};

const removeItem = (service: ICommonService, key: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => service.removeItem(key),
        options: {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [QUERY_SERVICE_ID, "getKeys"] });
            },
        },
    });
};

const clear = (service: ICommonService) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => service.clear(),
        options: {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [QUERY_SERVICE_ID, "getKeys"] });
            },
        },
    });
};

export const useCommonMutations = {
    setItem,
    removeItem,
    clear,
};