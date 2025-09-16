/**
 * Common mock for all services
 */

import type { ICommonService } from "./common.interface";
import { CommonMockData } from "./mock-data/common-mock.data";

export const createCommonMock = (): ICommonService => ({
    async getKeys(): Promise<string[]> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return CommonMockData.data_getter().keys;
    },
    async getItem(_key: string): Promise<string | null> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return CommonMockData.data_getter().item;
    },
    async setItem(_key: string, _value: string): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        CommonMockData.data_setter(_key, _value);
        return;
    },
    async removeItem(_key: string): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        CommonMockData.data_remover(_key);
        return;
    },
    async clear(): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        CommonMockData.data_clearer();
        return;
    },
});