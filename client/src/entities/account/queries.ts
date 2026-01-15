import { accountControllerGetAccountInfo, accountControllerPatchAccount, PatchAccountDto } from "@/shared/api/generated"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const accountKey = ['account']

export const useAccountQuery = () => {
  return useQuery({
    queryKey: accountKey,
    queryFn: accountControllerGetAccountInfo,
  })
}

export const useUpdateAccountMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: PatchAccountDto ) => accountControllerPatchAccount(data),
    async onSettled(): Promise<void> {
      await queryClient.invalidateQueries({ queryKey: accountKey })
    }
  })
}