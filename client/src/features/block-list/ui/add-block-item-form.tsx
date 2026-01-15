import { UISelectField } from "@/shared/ui/ui-select-field";
import { useAddBlockItemForm } from "../model/use-add-block-item-form";
import { UITextField } from "@/shared/ui/ui-text-field";
import { UIButton } from "@/shared/ui/ui-buttons";
import { AddBlockItemDtoType } from "@/shared/api/generated";

const typeOptions = [
  { label: "Website", value: AddBlockItemDtoType.WEBSITE },
  { label: "Keyword", value: AddBlockItemDtoType.KEYWORD },
];

export function AddBlockItemForm() {
  const { handleSubmit, isLoading, register, type } = useAddBlockItemForm();

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <UISelectField
        className="grow min-w-50"
        options={typeOptions}
        selectProps={{
          ...register("type"),
        }}
      />
      <UITextField
        className="grow"
        inputProps={{
          placeholder:
            type === "KEYWORD" ? "Enter Key Word..." : "Enter Web Site",
          ...register("data"),
        }}
      />
      <UIButton text="Add Block Item" variant="primary" disabled={isLoading} />
    </form>
  );
}