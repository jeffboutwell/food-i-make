import type { Meta, StoryObj } from "@storybook/nextjs";

import { InputField } from "./input-field";
import "@/src/app/globals.css";

const meta = {
  title: "Atoms/Input Field",
  component: InputField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { type: "text", label: "Email", placeholder: "Email" },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: "First Name",
    type: "text",
    placeholder: "First Name",
  },
};

export const Email: Story = {
  args: {
    label: "Email",
    type: "email",
    placeholder: "Email",
  },
};

export const Password: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Password",
  },
};
