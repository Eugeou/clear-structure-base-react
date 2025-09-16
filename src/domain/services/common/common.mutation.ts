/**
 * Common query
 */

import { useMutation } from "@/infrastructure/plugins/tanstack";
import { useQueryClient } from "@tanstack/react-query";
import { type ICommonService } from "./common.interface";

const QUERY_SERVICE_ID = "common";

const setItem = (service: ICommonService, params?: { isDelayed: boolean }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { key: string, value: string }) => service.setItem(data.key, data.value),
        options: {
            enabled: !params?.isDelayed,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [QUERY_SERVICE_ID, "getKeys"] });
            },
        },
    });
};

const removeItem = (service: ICommonService, key: string, params?: { isDelayed: boolean }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => service.removeItem(key),
        options: {
            enabled: !params?.isDelayed,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [QUERY_SERVICE_ID, "getKeys"] });
            },
        },
    });
};

const clear = (service: ICommonService, params?: { isDelayed: boolean }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => service.clear(),
        options: {
            enabled: !params?.isDelayed,
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