import { InputField } from "@/lib/components/atoms/input-field/input-field";

export const EditSource = () => {
  return (
    <div className="EditSource flex flex-col gap-2">
      <InputField name={"source.name"} label={"Source"} />
      <InputField name={"source.url"} label={"Source URL"} type={"url"} />
    </div>
  );
};
