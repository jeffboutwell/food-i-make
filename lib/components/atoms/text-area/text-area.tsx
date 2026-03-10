import React from "react";
import { clsx } from "clsx";
import { inter } from "@/lib/fonts";
import { Textarea as TextAreaBase } from "@/components/ui/textarea";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { useFormContext } from "react-hook-form";

type TextAreaProps = {
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
  rows?: number;
  className?: string;
};

export const TextArea = ({
  name,
  label,
  description,
  placeholder,
  rows = 4,
  className,
}: TextAreaProps) => {
  const {
    register,
    setError,
    formState: { errors },
  } = useFormContext();

  const inputId = String(name);

  return (
    <Field>
      {label && <FieldLabel htmlFor={inputId}>{label}</FieldLabel>}
      <TextAreaBase
        className={clsx("TextArea", className, inter.className)}
        id={inputId}
        placeholder={placeholder}
        rows={rows}
        {...register(name)}
      />
      {description && <FieldDescription>{description}</FieldDescription>}
      {errors[name] && (
        <FieldError>{errors[name]?.message as string}</FieldError>
      )}
    </Field>
  );
};
