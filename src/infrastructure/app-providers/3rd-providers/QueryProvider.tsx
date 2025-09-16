import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

const MAX_RETRY = 4;
const ONE_MINUTE = 60 * 1000;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3 * ONE_MINUTE,
      gcTime: 5 * ONE_MINUTE,
      retry: (failureCount, error: any) => {
        if (error?.status === 404 || error?.status === 401) {
          return false;
        }
        return failureCount < MAX_RETRY;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: true,
    },
    mutations: {
      retry: false,
    },
  },
});

interface QueryProviderProps {
  children: ReactNode;
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
  // const [client] = React.useState(queryClient);
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
