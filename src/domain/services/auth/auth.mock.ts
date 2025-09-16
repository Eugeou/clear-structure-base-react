/**
 * Auth mock
 */

import type { UserInfo } from "../../types/user";
import type { IAuthService } from "./auth.interface";
import { AuthMockData } from "./mock-data/auth-mock.data";

export const createAuthMock = (): IAuthService => ({
    login: async (_email: string, _password: string) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return AuthMockData.data_getter().userInfo;
    },
    logout: async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return 'User logged out successfully';
    },
    createUser: async (_userInfo: UserInfo) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return AuthMockData.data_setter(_userInfo).userInfo!;
    },
    getUserInfo: async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return AuthMockData.data_getter().userInfo;
    },
    updateUser: async (userInfo: UserInfo) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return AuthMockData.data_setter(userInfo).userInfo!;
    },
    deleteUser: async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return 'User deleted successfully';
    },
    clearUser: async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return 'User cleared successfully';
    },
});