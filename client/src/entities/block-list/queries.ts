import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddBlockItemDtoType, blockListControllerAddBlockItem, blockListControllerGetBlockList, blockListControllerRemoveBlockItem } from "@/shared/api/generated";

const blockListKey = ['block-list'] as unknown[];  

export function useBlockListQuery({q}: {q?: string}) {
  return useQuery({
    queryKey: blockListKey.concat([{ q }]),
    queryFn: () => blockListControllerGetBlockList({ q }),
  });
}

export function useAddBlockItemMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (blockItem: {
      type: AddBlockItemDtoType;
      data: string;
    }) => blockListControllerAddBlockItem(blockItem),
    async onSettled() {
      await queryClient.invalidateQueries({ queryKey: blockListKey });
    }
  });
}

export function useRemoveBlockItemMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => blockListControllerRemoveBlockItem(id),
    async onSettled() {
      await queryClient.invalidateQueries({ queryKey: blockListKey });
    }
  });
}