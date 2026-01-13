'use client'

import { authControllerGetSessionInfo } from '@/shared/api/generated'
import { ROUTES } from '@/shared/constants/routes'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { UISpinner } from '../ui-spinner'
import { useAuthSession } from '@/features/auth/model/use-auth-session'

type ProtectedLayoutProps = {
  children: React.ReactNode
}

export function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const router = useRouter()

  const { user, isLoading, isError } = useAuthSession()

  useEffect(() => {
    // If there's an error (like 401 Unauthorized), redirect to sign-in
    if (isError) {
      router.push(ROUTES.SIGN_IN)
    }
  }, [isError, router])

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <UISpinner className="w-8 h-8 text-teal-500" />
      </div>
    )
  }

  // If not authenticated, don't render children (redirect will happen)
  if (!user || isError) {
    return null
  }

  // User is authenticated, render children
  return <>{children}</>
}
