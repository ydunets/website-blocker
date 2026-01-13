'use client'

import { authControllerSignIn, SignInBodyDto } from '@/shared/api/generated'
import { ROUTES } from '@/shared/constants/routes'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

export function useSignInForm() {
  const router = useRouter()

  const { register, handleSubmit } = useForm<{
    email: string
    password: string
  }>()

  const signInMutation = useMutation({
    mutationFn: async (data: SignInBodyDto) => await authControllerSignIn(data),
    onSuccess() {
      router.push(ROUTES.HOME)
    },
  })

  const errorMessage = signInMutation.error ? 'Sign in failed' : undefined

  return {
    register,
    errorMessage,
    handleSubmit: handleSubmit((data) => signInMutation.mutate(data)),
    isPending: signInMutation.isPending,
  }
}
