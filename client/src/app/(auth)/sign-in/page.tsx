import { SignInForm } from '@/features/auth/ui/sign-in-form'
import { UIFormPageLayout } from '@/shared/ui/layouts/ui-form-page-layout'
import { UIHeader } from '@/shared/ui/ui-header'

export default function SignInPage() {
  return (
    <UIFormPageLayout
      title="Sign In"
      header={<UIHeader />}
      form={<SignInForm />}
    />
  )
}
