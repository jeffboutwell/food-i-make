import type { Preview } from "@storybook/nextjs-vite";
import { MockSessionProvider } from "./mocks/mock-session-provider";
import { FormProvider, useForm } from "react-hook-form";

type StoryFormParams = {
  defaultValues?: Record<string, unknown>;
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
  decorators: [
    (Story, { parameters }) => {
      // Pulls the 'session' parameter configured in your individual stories
      const session = parameters.session ?? null;
      const formParams = (parameters.form ?? {}) as StoryFormParams;
      const methods = useForm({
        defaultValues: formParams.defaultValues,
      });

      return (
        <MockSessionProvider session={session}>
          <FormProvider {...methods}>
            <Story />
          </FormProvider>
        </MockSessionProvider>
      );
    },
  ],
};

export default preview;
