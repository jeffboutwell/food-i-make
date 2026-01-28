import type { Meta, StoryObj } from "@storybook/nextjs";
import { Trash2 } from "lucide-react";

import { IconButton } from "./icon-button";
import "@/app/globals.css";

const meta = {
  title: "Atoms/Icon Button",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { icon: <Trash2 /> },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <IconButton {...args} />,
};
