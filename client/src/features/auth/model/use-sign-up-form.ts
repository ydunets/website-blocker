'use client'

import { authControllerSignUp, SignUpBodyDto } from '@/shared/api/generated'
import { ROUTES } from '@/shared/constants/routes'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

export function useSignUpForm() {
  const router = useRouter()

  const { register, handleSubmit } = useForm<{
    email: string
    password: string
  }>()

  const signUpMutation = useMutation({
    mutationFn: async (data: SignUpBodyDto) => await authControllerSignUp(data),
    onSuccess() {
      router.push(ROUTES.HOME)
    },
  })

  const errorMessage = signUpMutation.error ? 'Sign up failed' : undefined

  return {
    register,
    errorMessage,
    handleSubmit: handleSubmit((data) => signUpMutation.mutate(data)),
    isPending: signUpMutation.isPending,
  }
}
