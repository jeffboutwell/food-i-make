import type { Meta, StoryObj } from "@storybook/nextjs";
import { useEffect, useState, type ReactElement } from "react";

import { Recipe } from "./recipe";
import "@/app/globals.css";
import { mockRecipeFull } from "@/lib/mocks";
import { RecipeSkeleton } from "./recipe.skeleton";
import { RecipeFull } from "@/types";

const RecipeStoryWrapper = ({ recipe }: { recipe: RecipeFull }) => {
  const [content, setContent] = useState<ReactElement | null>(null);

  useEffect(() => {
    let mounted = true;

    Recipe({ recipe }).then((result) => {
      if (mounted) {
        setContent(result);
      }
    });

    return () => {
      mounted = false;
    };
  }, [recipe]);

  return content ?? <RecipeSkeleton />;
};

const meta = {
  title: "Organisms/Recipe",
  component: RecipeStoryWrapper,
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
} satisfies Meta<typeof RecipeStoryWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Skeleton: Story = {
  render: () => <RecipeSkeleton />,
};
