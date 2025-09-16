/**
 * Auth query
 */

import { useQuery } from "@/infrastructure/plugins/tanstack";
import { type IAuthService } from "./auth.interface";

const QUERY_SERVICE_ID = "auth";

const getUserInfo = (service: IAuthService, params?: { isDelayed: boolean }) => {
    return useQuery({
        queryKey: [QUERY_SERVICE_ID, "getUserInfo"],
        queryFn: () => service.getUserInfo(),
        options: {
            enabled: !params?.isDelayed,
        },
    });
};

export const useAuthQueries = {
    getUserInfo,
};