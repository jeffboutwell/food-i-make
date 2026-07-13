import { inter } from "@/lib/fonts";
import { clsx } from "clsx";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { FieldValues, Path, useFormContext } from "react-hook-form";

type InputFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  id?: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number" | "url" | "file";
  isRequired?: boolean;
  className?: string;
};

export const InputField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  type = "text",
  isRequired = false,
  className,
  id,
}: InputFieldProps<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const inputId = id ?? name;

  return (
    <Field className={clsx("InputField InputField__container", className)}>
      <FieldLabel
        htmlFor={inputId}
        className={clsx(inter.className, "InputField__label")}
      >
        {label}
      </FieldLabel>
      <Input
        className={clsx(
          "InputField__input block p-1 font-extralight text-lg border border-slate-700 dark:border-slate-50 rounded-sm",
          inter.className,
        )}
        id={inputId}
        placeholder={placeholder}
        required={isRequired}
        type={type}
        step={type === "number" ? "any" : undefined}
        {...register(name)}
      />
      {errors[name] && (
        <FieldError>{errors[name]?.message as string}</FieldError>
      )}
    </Field>
  );
};
