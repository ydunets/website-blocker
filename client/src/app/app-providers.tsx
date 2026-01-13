"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/shared/api/query-client";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Add React Query Devtools for development */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}