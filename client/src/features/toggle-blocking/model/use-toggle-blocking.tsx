import { useAccountQuery, useUpdateAccountMutation } from "@/entities/account/queries";

export const useToggleBlocking = (initialState: boolean = false) => {
  const accountQuery = useAccountQuery();

  const updateAccountMutation = useUpdateAccountMutation();

  const toggleBlocking = () => {
    if(accountQuery.data) {
      updateAccountMutation.mutate({
        isBlockingEnabled: !accountQuery.data.isBlockingEnabled,
      });
    }
  }

  return {
    isPending: updateAccountMutation.isPending || accountQuery.isLoading,
    toggleBlocking,
    isBlockingEnabled: accountQuery.data?.isBlockingEnabled ?? false,
    isReady: !!accountQuery.data,
  };
}