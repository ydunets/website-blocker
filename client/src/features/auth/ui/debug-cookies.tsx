'use client'

import { useEffect, useState } from 'react'

export function DebugCookies() {
  const [cookies, setCookies] = useState<string>('')

  useEffect(() => {
    // Get all cookies
    setCookies(document.cookie)
  }, [])

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-lg max-w-md">
      <h3 className="font-bold mb-2">🍪 Debug Cookies:</h3>
      <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-40">
        {cookies || 'No cookies found'}
      </pre>
    </div>
  )
}
