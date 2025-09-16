import {
  useMutation as useTanStackMutation,
  useQuery as useTanStackQuery,
  type MutationFunction,
  type QueryFunction,
  type UseMutationOptions,
  type UseMutationResult,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";

export interface query<TResponse = unknown, TError = Error> {
  queryKey: string[];
  queryFn: QueryFunction<TResponse, readonly unknown[]>;
  options?: Omit<UseQueryOptions<TResponse, TError>, "queryKey" | "queryFn">;
}
export interface mutation<TResponse, TRequest, TError = Error> {
  mutationFn: MutationFunction<TResponse, TRequest>;
  options?: Omit<UseMutationOptions<TResponse, TError, TRequest>, "mutationFn">;
}
export function useQuery<TResponse, TError = Error>(
  query: query<TResponse, TError>
) {
  return useTanStackQuery<TResponse, TError>({
    queryKey: query.queryKey,
    queryFn: query.queryFn,
    ...query.options,
  });
}
export function useMutation<TResponse, TRequest, TError = Error>(
  mutation: mutation<TResponse, TRequest, TError>
) {
  return useTanStackMutation<TResponse, TError, TRequest>({
    mutationFn: mutation.mutationFn,
    ...mutation.options,
  });
}

export interface BaseQueryResult {
  isLoading: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
}

export interface QueryResult<T> extends BaseQueryResult {
  data: T | undefined;
}
export interface BaseMutationResult {
  isPending: boolean;
}

export interface MutationResult<TResponse, TRequest>
  extends BaseMutationResult {
  mutate: (data: TRequest) => void;
  mutateAsync: (data: TRequest) => Promise<TResponse>;
  isError: boolean;
  isSuccess: boolean;
}

export function useServiceQuery<T, S, P = undefined>(
  queryFunc: (service: S, params?: P) => UseQueryResult<T, Error>,
  serviceFac: () => S,
  params?: P
): QueryResult<T> {
  const service = serviceFac();

  const query = queryFunc(service, params);
  return {
    data: query.data,
    isLoading: query.isPending,
    isFetching: query.isFetching,
    isSuccess: query.isSuccess,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

export function useServiceMutation<TResponse, TRequest, S>(
  mutationFunc: (service: S) => UseMutationResult<TResponse, Error, TRequest>,
  serviceFac: () => S
): MutationResult<TResponse, TRequest> {
  const service = serviceFac();

  const mutation = mutationFunc(service);

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
    mutateAsync: mutation.mutateAsync,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
}
