/**
 * Auth interface
 */

import { env } from "process";
import type { UserInfo } from "../../types/user";
import { createAuthMock } from "./auth.mock";
import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";

export interface IAuthService {
    login(email: string, password: string): Promise<UserInfo>;
    logout(): Promise<string>;
    createUser(userInfo: UserInfo): Promise<UserInfo>;
    getUserInfo(): Promise<UserInfo>;
    updateUser(userInfo: UserInfo): Promise<UserInfo>;
    deleteUser(): Promise<string>;
    clearUser(): Promise<string>;
}

const authService = new AuthService(env.api.auth);
const authServiceMock = createAuthMock();

export function getApi(isMock: boolean = false): IAuthService {
    if (!isMock) {
        return authService;
    }
    return authServiceMock;
}

export function useAuthQuery<T, P = undefined>(
    queryFunc: (service: IAuthService, params?: P) => UseQueryResult<T, Error>,
    params?: P
  ): QueryResult<T> {
    return useServiceQuery(queryFunc, getApi, params);
  }
  
  export function useAuthMutation<TResponse, TRequest>(
    mutationFunc: (
      service: IAuthService
    ) => UseMutationResult<TResponse, Error, TRequest>
  ): MutationResult<TResponse, TRequest> {
    return useServiceMutation(mutationFunc, getApi);
  }