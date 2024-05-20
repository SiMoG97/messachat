import type { Meta, StoryObj } from "@storybook/react";
import { WelcomeComp } from ".";

const meta = {
  title: "Chat side/WelcomeComp",
  component: WelcomeComp,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof WelcomeComp>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // closeChat: () => {},
  },
};
