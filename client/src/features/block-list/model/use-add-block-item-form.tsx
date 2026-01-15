import { useAddBlockItemMutation } from '@/entities/block-list/queries'
import { AddBlockItemDtoType } from '@/shared/api/generated'
import { useForm } from 'react-hook-form'

export const useAddBlockItemForm = () => {
  'use no memo'
  // Implementation for block item form logic would go here
  const { handleSubmit, register, watch} = useForm<{
    type: AddBlockItemDtoType
    data: string
  }>({
    defaultValues: {
      type: AddBlockItemDtoType.WEBSITE,
      data: ''
    }
  })

  const addBlockItemMutation = useAddBlockItemMutation()

  const type = watch('type')

  return {
    handleSubmit: handleSubmit((data) => addBlockItemMutation.mutate(data)),
    isLoading: addBlockItemMutation.isPending,
    register,
    type,
  }
}
