'use client'

import { UIHeader } from '@/shared/ui/ui-header'
import { withAuth } from '@/shared/ui/layouts/protected-layout'
import { useAuthSession } from '@/entities/session/queries'
import { ToggleBlockingButton } from '@/features/toggle-blocking/ui/toggle-blocking.button'
import { Profile } from '@/widgets/profile'
import { useBlockListQuery } from '@/entities/block-list/queries'
import { BlockList } from '@/features/block-list/ui/block-list'
import { AddBlockItemForm } from '@/features/block-list/ui/add-block-item-form'

function HomePage() {
  const { data } = useAuthSession()
  const { data: blockListData } = useBlockListQuery({})
  return (
    <main className="min-h-screen flex flex-col">
      <UIHeader
        className="w-full"
        right={
          <Profile/>
        }
      />
      <div className='grid grid-cols-[200px_1fr]'>
        <aside className="px-5 pt-10">
          <ToggleBlockingButton />
        </aside>
        <main className="pt-10 px-5">
          <h1 className="text-2xl mb-8">Block list</h1>
          <AddBlockItemForm />
          <BlockList className="mt-3" />
        </main>
      </div>
    </main>
  )
}

export default withAuth(HomePage)

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
