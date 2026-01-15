import { useAuthSession } from "@/entities/session"
import { SignOutButton } from "@/features/auth/ui/sign-out-button";

export function Profile() {
  const {data: session} = useAuthSession()

  if(!session) {
    return null;
  }

  return (
    <div className="flex gap-2 items-center">
      {session.email}
      <SignOutButton />
    </div>
  )
}