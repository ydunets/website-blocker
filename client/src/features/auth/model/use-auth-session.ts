'use client'

import { authControllerGetSessionInfo } from '@/shared/api/generated'
import { useQuery } from '@tanstack/react-query'

export function useAuthSession() {
  const { data: session, isLoading, error } = useQuery({
    queryKey: ['session'],
    queryFn: authControllerGetSessionInfo,
    retry: false,
    staleTime: 5 * 60 * 1000, // Consider fresh for 5 minutes
  })

  return {
    user: session,
    isLoading,
    isAuthenticated: !!session && !error,
    isError: !!error,
  }
}
