import { UIButton } from "@/shared/ui/ui-buttons";
import { useToggleBlocking } from "../model/use-toggle-blocking";


export function ToggleBlockingButton({}) {
  const {isBlockingEnabled, toggleBlocking, isReady, isPending } = useToggleBlocking();

  if(!isReady) {
    return null;
  }

  return (
    <UIButton
      disabled={isPending}
      text={isBlockingEnabled ? "Enable Blocking" : "Disable Blocking"}
      variant={isBlockingEnabled ? "primary" : "secondary"}
      onClick={toggleBlocking}
    />
  );
}