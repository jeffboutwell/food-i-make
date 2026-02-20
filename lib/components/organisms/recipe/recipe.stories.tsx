import type { Meta, StoryObj } from "@storybook/nextjs";

import { Recipe } from "./recipe";
import "@/app/globals.css";
import { mockRecipe } from "@/lib/mocks";

const meta = {
  title: "Organisms/Recipe",
  component: Recipe,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    recipe: mockRecipe,
  },
} satisfies Meta<typeof Recipe>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
