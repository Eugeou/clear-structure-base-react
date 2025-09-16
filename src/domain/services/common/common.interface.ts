/**
 * Common interface for all services
 */
import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { createCommonMock } from "./common.mock";
import { CommonService } from "./common.service";
import { env } from "@/infrastructure/env/env";
export interface ICommonService {
  getKeys(): Promise<string[]>;
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
  clear(): Promise<void>;
}

let service: ICommonService;
const commonServiceMock = createCommonMock();

export function getApi(isMock: boolean = false): ICommonService {
  if (!isMock) {
    if (!service) service = new CommonService(env.api.proxy);

    return service;
  }
  return commonServiceMock;
}

export function useCommonQuery<T, P = undefined>(
  queryFunc: (service: ICommonService, params?: P) => UseQueryResult<T, Error>,
  params?: P
): QueryResult<T> {
  return useServiceQuery(queryFunc, getApi, params);
}

export function useCommonMutation<TResponse, TRequest>(
  mutationFunc: (
    service: ICommonService
  ) => UseMutationResult<TResponse, Error, TRequest>
): MutationResult<TResponse, TRequest> {
  return useServiceMutation(mutationFunc, getApi);
}
