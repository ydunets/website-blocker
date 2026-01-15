'use client'

import { authControllerSignOut } from '@/shared/api/generated'
import { ROUTES } from '@/shared/constants/routes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export function useSignOut() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const signOutMutation = useMutation({
    mutationFn: () => authControllerSignOut(),
    onSuccess() {
      // Clear the session cache
      queryClient.setQueryData(['session'], null)
      queryClient.cancelQueries({ queryKey: ['session'] })

      // Redirect to sign-in page
      router.push(ROUTES.SIGN_IN)
    },
  })

  return {
    signOut: () => signOutMutation.mutate(),
    isLoading: signOutMutation.isPending,
  }
}
