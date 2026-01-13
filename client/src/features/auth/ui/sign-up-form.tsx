"use client";
import { UIButton } from "@/shared/ui/ui-buttons";
import { UILink } from "@/shared/ui/ui-link";
import { UITextField } from "@/shared/ui/ui-text-field";
import { ROUTES } from "@/shared/constants/routes";
import { useSignUpForm } from "../model/use-sign-up-form";

export function SignUpForm() {
  const { handleSubmit, isPending, register, errorMessage } = useSignUpForm();

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <UITextField
        label="Email"
        inputProps={{ type: "email", ...register("email", { required: true }) }}
      />
      <UITextField
        label="Password"
        inputProps={{
          type: "password",
          ...register("password", { required: true }),
        }}
      />
      <UIButton text="Sign Up" disabled={isPending} variant="primary"/>
      <UILink className="text-center" href={ROUTES.SIGN_IN}>
        Sign In
      </UILink>
      {errorMessage && <div className="text-rose-500">{errorMessage}</div>}
    </form>
  );
}