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
    conversation: {
      id: "sajdlfjsdalkfsad",
      createdAt: new Date(),
      isGroup: true,
      name: "best group",
      users: [],
      messagesIds: [],
      lastMessageAt: new Date(),
      userIds: [],
    },
    messages: [],
  },
};

export const ChatIsOpen: Story = {
  args: {
    conversation: {
      id: "sajdlfjsdalkfsad",
      createdAt: new Date(),
      isGroup: true,
      name: "best group",
      users: [],
      messagesIds: [],
      lastMessageAt: new Date(),
      userIds: [],
    },
    messages: [],
  },
};
