import { UserFull } from "./db/user";
import { RecipeFull } from "./db/recipe";
import { IngredientFull } from "./db/ingredient";
import { IngredientSectionFull } from "./db/ingredient-section";

export const mockIngredientList: IngredientFull[] = [
  {
    id: 0,
    name: "flour",
    quantity: 2,
    unit: "cups",
    order: 0,
    sectionId: 10,
    note: "",
  },
];

export const mockIngredientsList1: IngredientFull[] = [
  {
    quantity: 1,
    name: "ground flaxseed",
    unit: "tablespoon",
    order: 0,
    id: 0,
    note: "",
    sectionId: 10,
  },
  {
    unit: "tablespoons",
    name: "water",
    quantity: 3,
    order: 1,
    id: 1,
    note: "",
    sectionId: 10,
  },
  {
    unit: "tablespoons",
    name: "vegan butter, slightly softened to room temperature",
    quantity: 10,
    order: 2,
    id: 2,
    note: "",
    sectionId: 10,
  },
  {
    name: "brown sugar, lightly packed",
    quantity: 1.25,
    unit: "cups",
    order: 3,
    id: 3,
    note: "",
    sectionId: 10,
  },
  {
    name: "pure vanilla extract",
    unit: "teaspoons",
    quantity: 2,
    order: 4,
    id: 4,
    note: "",
    sectionId: 10,
  },
];

export const mockIngredientsList2: IngredientFull[] = [
  {
    name: "all purpose flour",
    quantity: 1.5,
    unit: "cups",
    order: 5,
    id: 5,
    note: "",
    sectionId: 10,
  },
  {
    name: "cornstarch",
    quantity: 2,
    unit: "tsp",
    order: 6,
    id: 6,
    note: "",
    sectionId: 10,
  },
  {
    name: "baking soda",
    unit: "tsp",
    quantity: 1,
    order: 7,
    id: 7,
    note: "",
    sectionId: 10,
  },
  {
    unit: "tsp",
    quantity: 0.25,
    name: "salt",
    order: 8,
    id: 8,
    note: "",
    sectionId: 10,
  },
  {
    quantity: 1,
    unit: "cup",
    name: "non-dairy chocolate chips",
    order: 9,
    id: 9,
    note: "",
    sectionId: 10,
  },
];

export const mockIngredientSection: IngredientSectionFull = {
  ingredients: mockIngredientList,
  name: "Section Name",
  order: 0,
  recipeId: 100,
  id: 0,
};

export const mockIngredientSection1: IngredientSectionFull = {
  ingredients: mockIngredientsList1,
  name: "Wet Ingredients",
  order: 0,
  recipeId: 101,
  id: 0,
};

export const mockIngredientSection2: IngredientSectionFull = {
  ingredients: mockIngredientsList2,
  name: "Dry Ingredients",
  order: 0,
  recipeId: 102,
  id: 0,
};

export const mockRecipe: RecipeFull = {
  tags: ["dessert", "vegan", "cookies"],
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
  images: [
    "https://ik.imagekit.io/x25zmqidz/o/images%2FjBhRVTK9sGP0xKf2eOyG0R2HDcn1-vegan-chocolate-chip-cookies-6-1024x1536.jpg-b7e04173-4b09-4af6-86f3-7e13762f538c?alt=media&token=8cf79d6a-8339-4219-9aa9-824b32c4fd8b",
  ],
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
