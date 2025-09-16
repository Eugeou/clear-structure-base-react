/**
 * Auth service
 */

import type { HttpServiceBase } from "@/infrastructure/plugins/http/http-service-base";
import type { IAuthService } from "./auth.interface";
import type { UserInfo } from "../../types";

export class AuthService implements IAuthService {
    private readonly http: HttpServiceBase;
    private readonly baseUrl: string;

    constructor(proxy: string) {
        this.http = new HttpServiceBase(proxy);
        this.baseUrl = `${proxy}/api/v1`;
    }

    async login(email: string, password: string): Promise<UserInfo> {
        return this.http.post(`${this.baseUrl}/login`, { email, password });
    }
    
    async logout(): Promise<string> {
        return this.http.post(`${this.baseUrl}/logout`);
    }
    
    async createUser(userInfo: UserInfo): Promise<UserInfo> {
        return this.http.post(`${this.baseUrl}/createUser`, userInfo);
    }
    
    async getUserInfo(): Promise<UserInfo> {
        return this.http.get(`${this.baseUrl}/getUserInfo`);
    }
    
    async updateUser(userInfo: UserInfo): Promise<UserInfo> {
        return this.http.put(`${this.baseUrl}/updateUser`, userInfo);
    }
    
    async deleteUser(): Promise<string> {
        return this.http.delete(`${this.baseUrl}/deleteUser`);
    }
    
    async clearUser(): Promise<string> {
        return this.http.delete(`${this.baseUrl}/clearUser`);
    }
}
    
}