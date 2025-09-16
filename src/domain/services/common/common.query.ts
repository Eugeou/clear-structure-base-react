/**
 * Common query
 */

import { useQuery } from "@/infrastructure/plugins/tanstack";
import { type ICommonService } from "./common.interface";

const QUERY_SERVICE_ID = "common";

const getKeys = (service: ICommonService, params?: { isDelayed: boolean }) => {
    return useQuery({
        queryKey: [QUERY_SERVICE_ID, "getKeys"],
        queryFn: () => service.getKeys(),
        options: {
            enabled: !params?.isDelayed,
        },
    });
};

const getItem = (service: ICommonService, key: string, params?: { isDelayed: boolean } ) => {
    return useQuery({
        queryKey: [QUERY_SERVICE_ID, "getItem", key],
        queryFn: () => service.getItem(key),
        options: {
            enabled: !params?.isDelayed,
        },
    });
};

export const useCommonQueries = {
    getKeys,
    getItem,
};