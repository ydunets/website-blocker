import { UIButton } from "@/shared/ui/ui-buttons";
import { useSignOut } from "../model/use-sign-out";

export function SignOutButton() {
  const { isLoading, signOut } = useSignOut();
  return (
    <UIButton
      text="Sign Out"
      variant="outlined"
      disabled={isLoading}
      onClick={signOut}
    />
  );
}