import type { Meta, StoryObj } from "@storybook/nextjs";

import { TextArea } from "./text-area";
import "@/src/app/globals.css";

const meta = {
  title: "Atoms/Text Area",
  component: TextArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    name: "Test",
    placeholder: "Write your message here...",
    label: "Feedback",
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
