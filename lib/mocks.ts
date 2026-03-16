import { UserFull } from "./db/user";
import { Recipe } from "@/app/generated/prisma/client";
import { IngredientFormValues } from "./db/recipe/ingredient.schemas";
import { IngredientSectionFormValues } from "./db/recipe/ingredient-section.schemas";
import { ImageResponse } from "./db/recipe/image.types";

export const mockIngredientList: IngredientFormValues[] = [
  {
    name: "flour",
    quantity: 2,
    unit: "cups",
  },
];

export const mockIngredientsList1: IngredientFormValues[] = [
  {
    quantity: 1,
    name: "ground flaxseed",
    unit: "tablespoon",
  },
  {
    unit: "tablespoons",
    name: "water",
    quantity: 3,
  },
  {
    unit: "tablespoons",
    name: "vegan butter, slightly softened to room temperature",
    quantity: 10,
  },
  {
    name: "brown sugar, lightly packed",
    quantity: 1.25,
    unit: "cups",
  },
  {
    name: "pure vanilla extract",
    unit: "teaspoons",
    quantity: 2,
  },
];

export const mockIngredientsList2: IngredientFormValues[] = [
  {
    name: "all purpose flour",
    quantity: 1.5,
    unit: "cups",
  },
  {
    name: "cornstarch",
    quantity: 2,
    unit: "tsp",
  },
  {
    name: "baking soda",
    unit: "tsp",
    quantity: 1,
  },
  {
    unit: "tsp",
    quantity: 0.25,
    name: "salt",
  },
  {
    quantity: 1,
    unit: "cup",
    name: "non-dairy chocolate chips",
  },
];

export const mockIngredientSection: IngredientSectionFormValues = {
  ingredients: mockIngredientList,
  name: "Section Name",
};

export const mockIngredientSection1: IngredientSectionFormValues = {
  ingredients: mockIngredientsList1,
  name: "Wet Ingredients",
};

export const mockIngredientSection2: IngredientSectionFormValues = {
  ingredients: mockIngredientsList2,
  name: "Dry Ingredients",
};

export const imageMock: Omit<ImageResponse, "$ResponseMetadata"> = {
  url: "https://ik.imagekit.io/x25zmqidz/recipes/chocolate-chip-cookies_Ri7Op08r6",
  name: "chocolate-chip-cookies_Ri7Op08r6",
  size: 235269,
  width: 1024,
  AITags: null,
  fileId: "69ac6bb85c7cd75eb8f00120",
  height: 1536,
  filePath: "/recipes/chocolate-chip-cookies_Ri7Op08r6",
  fileType: "image",
  description: undefined,
  versionInfo: {
    id: "69ac6bb85c7cd75eb8f00120",
    name: "Version 1",
  },
  thumbnailUrl:
    "https://ik.imagekit.io/x25zmqidz/tr:n-ik_ml_thumbnail/recipes/chocolate-chip-cookies_Ri7Op08r6",
};

export const mockRecipe: Recipe = {
  directions: [
    "Preheat the oven to 350 degrees F and line two cookie sheets with parchment paper or silicone mats.",
    "Mix the ground flaxseed and water in a small bowl and set aside to make your flax egg.",
    "In a large bowl using a handheld mixer or a stand mixer with the paddle attachment, beat the softened vegan butter and brown sugar for 1-2 minutes until creamy.",
    "Add the vanilla and the flax egg and mix to combine.",
    "Next, stop the mixer and add the flour. Sprinkle the cornstarch, baking soda and salt on top of the flour. Turn the mixer on low speed, and mix until just combined. ",
    "Add in the chocolate chips to incorporate, either by hand or using the mixer.",
    "Roll the dough into balls, about 1-2 tablespoons each. Place on the prepared pans and bake for 10 minutes, until they are barely golden around the edges. Do not over bake! They will be puffy and lightly colored.",
    "Let cool on the cookie sheet for 5 minutes, then transfer to a cooling rack. The cookies will firm up as they cool, and become the most perfect chewy cookies ever! Enjoy.",
  ],
  servings: "30 cookies",
  name: "Chocolate Chip Cookies",
  prepTime: 20,
  cookTime: 30,
  notes: "cookie notes",
  slug: "chocolate-chip-cookies",
  source: {
    name: "",
    url: "",
  },
  description:
    "This is the best vegan chocolate chip cookies recipe ever! Easy to make in 1 bowl, no chilling required and they turn out perfect every time. Soft, chewy and full of chocolate chips!",
  images: [imageMock],
  sections: [mockIngredientSection1, mockIngredientSection2],
  id: 101,
  authorId: 23,
};

export const mockUser: UserFull = {
  firstName: "Ryne",
  lastName: "Sandberg",
  email: "ryno@google.com",
  recipes: [mockRecipe],
  id: 23,
  authId: "02369557",
  name: "Ryne Sandberg",
  image: "",
};
