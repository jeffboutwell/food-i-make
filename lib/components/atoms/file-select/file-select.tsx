import React from "react";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import UploadImage from "@/lib/actions/image.actions";

{
  /* <Field>
      <FieldLabel htmlFor="picture">Picture</FieldLabel>
      <Input id="picture" type="file" onChange={handleFileChange} />
      <FieldDescription>Select a picture to upload.</FieldDescription>
    </Field> */
}

export const FileSelect = () => {
  return <UploadImage />;
};
