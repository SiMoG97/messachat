import type { Meta, StoryObj } from "@storybook/react";
import { ChatSide } from ".";

const meta = {
  title: "Chat Side/ChatSide",
  component: ChatSide,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ChatSide>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ChatIsClosed: Story = {
  args: {
    setShowContacts: () => {
      return;
    },
    showContacts: true,
  },
};

export const ChatIsOpen: Story = {
  args: {
    setShowContacts: () => {
      return;
    },
    showContacts: false,
  },
};
