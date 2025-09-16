/**
 * Common service
 */

import type { ICommonService } from "./common.interface";
import { HttpServiceBase } from "../http/http.service.base";

export class CommonService implements ICommonService {
    private readonly http: HttpServiceBase;
    private baseUrl;
    private readonly API_VERSION = "api/v1";

    constructor(proxy: string) {
        this.http = new HttpServiceBase(proxy);
        this.baseUrl = `${proxy}/${this.API_VERSION}`;
    }

    async getKeys(): Promise<string[]> {
        return this.http.get(`${this.baseUrl}/keys`);
    }

    async getItem(key: string): Promise<string | null> {
        return this.http.get(`${this.baseUrl}/item/${key}`);
    }

    async setItem(key: string, value: string): Promise<void> {
        return this.http.post(`${this.baseUrl}/item`, { key, value });
    }

    async removeItem(key: string): Promise<void> {
        return this.http.delete(`${this.baseUrl}/item/${key}`);
    }

    async clear(): Promise<void> {
        return this.http.delete(`${this.baseUrl}/clear`);
    }
}