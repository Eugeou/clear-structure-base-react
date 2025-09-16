/**
 * Common service
 */

import type { ICommonService } from "./common.interface";
import { HttpServiceBase } from "@/infrastructure/http/http-service-base";
import { ApiServiceFactory } from "@/infrastructure/http/api-service-factory";
import { Environment } from "@/infrastructure/env/base-env.validation";
import { env } from "@/infrastructure/env/env";

export class CommonService implements ICommonService {
    private readonly http: HttpServiceBase;
    private baseUrl;
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

    async getKeys(): Promise<string[]> {
        return this.http.get(`${this.API_VERSION}/keys`);
    }

    async getItem(key: string): Promise<string | null> {
        return this.http.get(`${this.API_VERSION}/item/${key}`);
    }

    async setItem(key: string, value: string): Promise<void> {
        return this.http.post(`${this.API_VERSION}/item`, { key, value });
    }

    async removeItem(key: string): Promise<void> {
        return this.http.delete(`${this.API_VERSION}/item/${key}`);
    }

    async clear(): Promise<void> {
        return this.http.delete(`${this.API_VERSION}/clear`);
    }
}