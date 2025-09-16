/**
 * Auth service
 */

import { HttpServiceBase } from "@/infrastructure/http/http-service-base";
import type { IAuthService } from "./auth.interface";
import type { UserInfo } from "../../types";
import { ApiServiceFactory } from "@/infrastructure/http/api-service-factory";
import { Environment } from "@/infrastructure/env/base-env.validation";
import { env } from "@/infrastructure/env/env";

export class AuthService implements IAuthService {
  private readonly http: HttpServiceBase;
  private readonly baseUrl: string;
  private readonly API_VERSION = "api/v1";

  private lagSeconds = env.app.env === Environment.LOCAL ? 2 : 0;
  private async waitSecond(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, this.lagSeconds * 1000);
    });
  }

  constructor(url: string) {
    this.baseUrl = url;
    this.http = ApiServiceFactory.getCommonService(
      this.baseUrl,
      this.waitSecond
    );
  }

  async login(email: string, password: string): Promise<UserInfo> {
    return this.http.post(`${this.API_VERSION}/login`, { email, password });
  }

  async logout(): Promise<string> {
    return this.http.post(`${this.API_VERSION}/logout`);
  }

  async createUser(userInfo: UserInfo): Promise<UserInfo> {
    return this.http.post(`${this.API_VERSION}/createUser`, userInfo);
  }

  async getUserInfo(): Promise<UserInfo> {
    return this.http.get(`${this.API_VERSION}/getUserInfo`);
  }

  async updateUser(userInfo: UserInfo): Promise<UserInfo> {
    return this.http.put(`${this.API_VERSION}/updateUser`, userInfo);
  }

  async deleteUser(): Promise<string> {
    return this.http.delete(`${this.API_VERSION}/deleteUser`);
  }

  async clearUser(): Promise<string> {
    return this.http.delete(`${this.API_VERSION}/clearUser`);
  }
}
