import type { Meta, StoryObj } from "@storybook/react";
import { ChatComp } from ".";

const meta = {
  title: "Chat side/ChatComp",
  component: ChatComp,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ChatComp>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    closeChat: () => {
      return;
    },
  },
};
