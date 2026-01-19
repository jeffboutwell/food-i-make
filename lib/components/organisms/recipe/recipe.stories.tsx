import type { Meta, StoryObj } from "@storybook/nextjs";

import { Recipe } from "./recipe";
import "@/src/app/globals.css";

const meta = {
  title: "Organisms/Recipe",
  component: Recipe,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    recipe: {
      id: "3-bean-chili-mac",
      directions: [
        "Use sauté setting to sauté and soften onions. Add veggie broth to prevent sticking.",
        "Shut off sauté setting.",
        "Rinse/drain beans.",
        "Add beans, tomatoes, tomato sauce and seasoning. Mix through.",
        "Add cup of water. (Should mostly sit on top) Add pasta. Do NOT mix pasta through. Lightly submerge pasta under water and let them sit on top. Add a little more water if needed.",
        "Close Instant Pot and set for 4 minutes.",
        "Release pressure when done…mix and serve.",
      ],
      description: "A quick, easy & hearty weeknight dinner.",
      ingredients: [
        {
          name: "",
          ingList: [
            {
              name: "yellow onion",
              unit: "",
              amt: "1/2",
            },
            {
              unit: "tbsp",
              name: "vegetable broth",
              amt: "2",
            },
            {
              unit: "",
              amt: "3",
              name: "cans tri-blend beans",
            },
            {
              amt: "1",
              name: "can tomato sauce",
              unit: "",
            },
            {
              amt: "1",
              unit: "",
              name: "can petite diced tomatoes",
            },
            {
              amt: "1/4",
              unit: "tsp",
              name: "chili powder",
            },
            {
              name: "paprika",
              unit: "tsp",
              amt: "1",
            },
            {
              unit: "tsp",
              name: "cumin",
              amt: "1",
            },
            {
              unit: "cup",
              name: "more of dry pasta",
              amt: "1",
            },
            {
              name: "water",
              unit: "cup",
              amt: "1",
            },
          ],
        },
      ],
      notes: "",
      slug: "3-bean-chili-mac",
      prepTime: 20,
      tags: ["cold-weather", "instant-pot", "vegan", "comfort-food"],
      name: "3 Bean Chili Mac",
      servings: "8 servings",
      cookTime: 20,
      type: null,
      source: {
        name: "",
        url: "",
      },
      images: [
        "https://ik.imagekit.io/x25zmqidz/o/images%2FjBhRVTK9sGP0xKf2eOyG0R2HDcn1-cheesy-chili-mac-and-cheese-white-bowl.jpg-153fde1e-e17f-40da-8866-d8630d4164b1?alt=media&token=86ec44ca-a717-4e16-b8ae-5ef10720ce2c",
      ],
    },
  },
} satisfies Meta<typeof Recipe>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
