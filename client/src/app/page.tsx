'use client'

import { authControllerGetSessionInfo } from '@/shared/api/generated'
import { useQuery } from '@tanstack/react-query'
import { UIHeader } from '@/shared/ui/ui-header'

export default function HomePage() {
  const { data } = useQuery({
    queryKey: ['session'],
    queryFn: authControllerGetSessionInfo,
  })

  console.log(data)

  return (
    <div className="flex flex-col gap-4 min-h-screen items-center  bg-zinc-50 font-sans dark:bg-black">
      <UIHeader className="w-full" />
      <main className="flex flex-1 flex-col justify-center items-center w-full px-4">
        <h1 className="text-3xl font-bold text-center">
          Welcome to the Website Blocker Project!
        </h1>
        <p className="mt-4 text-center text-gray-600">
          This is the home page of your Next.js application.
        </p>
      </main>
    </div>
  )
}

{
  /* <UIHeader className="w-full" right={<div>Right Side</div>} />
      <UIButton
        variant="primary"
        text="Click me"
        onClick={() => alert('Button clicked!')}
      />
      <UIButton variant="secondary" text="Disabled" onClick={() => {}} />
      <UIButton variant="outlined" text="Outline" onClick={() => {}} />
      <UIButton variant="outlined" text="Outline" disabled onClick={() => {}} />
      <UITextField
        label="Username"
        inputProps={{ placeholder: 'Enter your username' }}
      />
      <UITextField
        label="Password"
        error="Password is required"
        inputProps={{ type: 'password', placeholder: 'Enter your password' }}
      />
      <UISpinner className="w-6 h-6 text-teal-500 animate-spin" />
      <UISelectField
        label="Language"
        options={[
          { value: 'en', label: 'English' },
          { value: 'es', label: 'Spanish' },
          { value: 'fr', label: 'French' },
          { value: 'de', label: 'German' },
          { value: 'zh', label: 'Chinese' },
          { value: 'ja', label: 'Japanese' },
          { value: 'ru', label: 'Russian' },
        ]}
      />
      <UISelectField label="Without options" options={[]} />
      <UILogo className="text-teal-500" />
      <UILink href="https://example.com" className="text-teal-500">
        Go to Example.com
      </UILink> */
}