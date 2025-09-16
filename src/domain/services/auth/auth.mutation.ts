/**
 * Auth mutation
 */

import { useMutation } from "@/infrastructure/plugins/tanstack";
import { type IAuthService } from "./auth.interface";
import type { UserInfo } from "../../types";
import { useQueryClient } from "@tanstack/react-query";

const QUERY_SERVICE_ID = "auth";

const login = (service: IAuthService) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      service.login(data.email, data.password),
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_SERVICE_ID, "getUserInfo"],
        });
      },
    },
  });
};

const logout = (service: IAuthService) => {
  return useMutation({
    mutationFn: () => service.logout(),
  });
};

const createUser = (service: IAuthService) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { userInfo: UserInfo }) =>
      service.createUser(data.userInfo),
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_SERVICE_ID, "getUserInfo"],
        });
      },
    },
  });
};

const updateUser = (service: IAuthService) => {
  return useMutation({
    mutationFn: (data: { userInfo: UserInfo }) =>
      service.updateUser(data.userInfo),
  });
};

const deleteUser = (service: IAuthService) => {
  return useMutation({
    mutationFn: () => service.deleteUser(),
  });
};

const clearUser = (service: IAuthService) => {
  return useMutation({
    mutationFn: () => service.clearUser(),
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
