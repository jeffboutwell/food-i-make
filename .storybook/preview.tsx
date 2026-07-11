import type { Preview } from "@storybook/nextjs-vite";
import { MockSessionProvider } from "./mocks/mock-session-provider";
import { FormProvider, useForm } from "react-hook-form";
import { ImageKitProvider as ImageKitContextProvider } from "@imagekit/next";

type StoryFormParams = {
  defaultValues?: Record<string, unknown>;
};

const urlEndpoint =
  process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "https://imagekit.io";

const preview: Preview = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
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
            <ImageKitContextProvider urlEndpoint={urlEndpoint}>
              <Story />
            </ImageKitContextProvider>
          </FormProvider>
        </MockSessionProvider>
      );
    },
  ],
};

export default preview;
