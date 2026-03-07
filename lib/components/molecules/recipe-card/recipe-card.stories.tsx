import type { Meta, StoryObj } from "@storybook/nextjs";

import { RecipeCardSkeleton } from "./recipe-card.skeleton";
import { RecipeCard } from "./recipe-card";
import { mockRecipe } from "@/lib/mocks";

const meta = {
  title: "Molecules/Recipe Card",
  component: RecipeCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    recipe: mockRecipe,
  },
} satisfies Meta<typeof RecipeCard>;

export default meta;
type Story = StoryObj<typeof RecipeCard>;

export const Default: Story = {};
export const Skeleton: Story = {
  render: () => <RecipeCardSkeleton />,
};
