"use client";
import { UIButton } from "@/shared/ui/ui-buttons";
import { UILink } from "@/shared/ui/ui-link";
import { UITextField } from "@/shared/ui/ui-text-field";
import { ROUTES } from "@/shared/constants/routes";
import { useSignInForm } from "../model/use-sign-in-form";

export function SignInForm() {
  const { handleSubmit, isPending, register, errorMessage } = useSignInForm();

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
      <UIButton text="Sign In" disabled={isPending} variant="primary"/>
      <UILink className="text-center" href={ROUTES.SIGN_UP}>
        Sign Up
      </UILink>
      {errorMessage && <div className="text-rose-500">{errorMessage}</div>}
    </form>
  );
}