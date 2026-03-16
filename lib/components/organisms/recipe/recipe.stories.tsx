import type { Meta, StoryObj } from "@storybook/nextjs";

import { Recipe } from "./recipe";
import "@/app/globals.css";
import { mockRecipeFull } from "@/lib/mocks";
import { RecipeSkeleton } from "./recipe.skeleton";

const meta = {
  title: "Organisms/Recipe",
  component: Recipe,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "800px", margin: "50px auto" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  args: {
    recipe: mockRecipeFull,
  },
} satisfies Meta<typeof Recipe>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Skeleton: Story = {
  render: () => <RecipeSkeleton />,
};
