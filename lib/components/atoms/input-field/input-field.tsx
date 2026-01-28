import { inter } from "@/lib/fonts";
import { clsx } from "clsx";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { useFormContext } from "react-hook-form";

const InputTypes = z.enum([
  "text",
  "email",
  "password",
  "number",
  "url",
  "file",
]);

export const InputFieldSchema = z.object({
  name: z.string(),
  label: z.string(),
  id: z.string().optional(),
  value: z.string().optional(),
  placeholder: z.string().optional(),
  type: InputTypes.optional(),
  isRequired: z.boolean().optional(),
  className: z.string().optional(),
});

export type InputFieldProps = z.infer<typeof InputFieldSchema>;

export const InputField = ({
  name,
  label,
  placeholder,
  type = "text",
  isRequired = false,
  className,
  id,
}: InputFieldProps) => {
  const {
    register,
    setError,
    formState: { errors },
  } = useFormContext();

  return (
    <Field className={clsx("InputField InputField__container", className)}>
      <FieldLabel
        htmlFor={id}
        className={clsx(inter.className, "InputField__label")}
      >
        {label}
      </FieldLabel>
      <Input
        className={clsx(
          "InputField__input block p-1 font-extralight text-lg border border-slate-700 dark:border-slate-50 rounded-sm",
        )}
        placeholder={placeholder}
        required={isRequired}
        type={type}
        {...register(name)}
      />
      {errors[name] && (
        <FieldError>{errors[name]?.message as string}</FieldError>
      )}
    </Field>
  );
};
