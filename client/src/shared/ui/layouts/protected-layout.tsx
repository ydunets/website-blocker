'use client'

import { ROUTES } from '@/shared/constants/routes'
import { useRouter } from 'next/navigation'
import { UISpinner } from '../ui-spinner'
import { useAuthSession } from '@/entities/session/queries'
import { PropsWithChildren } from 'react'

type ProtectedLayoutProps = {
  children: React.ReactNode
}

export function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const router = useRouter()
  const { data , isLoading, isError } = useAuthSession()

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <UISpinner className="w-8 h-8 text-teal-500" />
      </div>
    )
  }

  // If not authenticated, don't render children
  if (!data || isError) {
    router.replace(ROUTES.SIGN_IN)
  }

  // User is authenticated, render children
  return <>{children}</>
}

// HOC pattern for protecting page components
export function withAuth<P>(Component: React.ComponentType<P>) {
  return function ProtectedComponent(props: PropsWithChildren<P>) {
    const router = useRouter()
    const { isLoading, isError } = useAuthSession()

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <UISpinner className="w-8 h-8 text-teal-500" />
        </div>
      )
    }

    if (isError) {
      router.replace(ROUTES.SIGN_IN);
    }
    
    return <Component {...props} />
  }
}
