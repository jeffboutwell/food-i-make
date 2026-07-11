import type { Meta, StoryObj } from "@storybook/nextjs";

import { RecipeCardSkeleton } from "./recipe-card.skeleton";
import { RecipeCard } from "./recipe-card";
import { mockRecipe } from "@/lib/mocks";
import { RecipeCardVariant } from "@/components/molecules/recipe-card/recipe-card.types";

const meta = {
  title: "Molecules/Recipe Card",
  component: RecipeCard,
  decorators: [
    (Story) => (
      <div style={{ width: "400px", margin: "0 auto" }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ["autodocs"],
  args: {
    recipe: mockRecipe,
    variant: RecipeCardVariant.DEFAULT,
  },
} satisfies Meta<typeof RecipeCard>;

export default meta;
type Story = StoryObj<typeof RecipeCard>;

export const Default: Story = {};
export const Compact: Story = {
  args: {
    variant: RecipeCardVariant.COMPACT,
  },
};
export const Profile: Story = {
  args: {
    variant: RecipeCardVariant.PROFILE,
  },
};
export const Skeleton: Story = {
  render: () => <RecipeCardSkeleton />,
};
