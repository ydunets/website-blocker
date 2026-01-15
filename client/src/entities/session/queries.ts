'use client'

import { authControllerGetSessionInfo } from '@/shared/api/generated'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export function useAuthSession() {
  const { data: session, isLoading, error } = useQuery({
    queryKey: ['session'],
    queryFn: authControllerGetSessionInfo,
    retry: 0,
    staleTime: 5 * 60 * 1000, // Consider fresh for 5 minutes
  })

  return {
    data: session,
    isLoading,
    isAuthenticated: !!session && !error,
    isError: !!error,
  }
}


export function useResetSession() {
  const queryClient = useQueryClient();
  return () => queryClient.removeQueries();
}