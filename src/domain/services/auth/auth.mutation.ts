/**
 * Auth mutation
 */

import { useMutation } from "@/infrastructure/plugins/tanstack";
import { type IAuthService } from "./auth.interface";
import type { UserInfo } from "../../types";
import { useQueryClient } from "@tanstack/react-query";

const QUERY_SERVICE_ID = "auth";
    
const login = (service: IAuthService, params?: { isDelayed: boolean }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { email: string, password: string }) => service.login(data.email, data.password),
        options: {
            enabled: !params?.isDelayed,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [QUERY_SERVICE_ID, "getUserInfo"] });
            },
        },
    });
};

const logout = (service: IAuthService, params?: { isDelayed: boolean }) => {
    return useMutation({
        mutationFn: () => service.logout(),
        options: {
            enabled: !params?.isDelayed,
        },
    });
};

const createUser = (service: IAuthService, params?: { isDelayed: boolean }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { userInfo: UserInfo }) => service.createUser(data.userInfo),
        options: {
            enabled: !params?.isDelayed,
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_SERVICE_ID, "getUserInfo"] });
        },
    });
};

const updateUser = (service: IAuthService, params?: { isDelayed: boolean }) => {
    return useMutation({
        mutationFn: (data: { userInfo: UserInfo }) => service.updateUser(data.userInfo),
        options: {
            enabled: !params?.isDelayed,
        },
    });
};

const deleteUser = (service: IAuthService, params?: { isDelayed: boolean }) => {
    return useMutation({
        mutationFn: () => service.deleteUser(),
        options: {
            enabled: !params?.isDelayed,
        },
    });
};

const clearUser = (service: IAuthService, params?: { isDelayed: boolean }) => {
    return useMutation({
        mutationFn: () => service.clearUser(),
        options: {
            enabled: !params?.isDelayed,
        },
    });
};
export const useAuthMutations = {
    login,
    logout,
    createUser,
    updateUser,
    deleteUser,
    clearUser,
};