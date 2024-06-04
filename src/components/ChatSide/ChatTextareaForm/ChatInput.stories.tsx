import { type Meta, type StoryObj } from "@storybook/react";
import { ChatTextareaForm } from "./ChatTextareaForm";

const meta = {
  title: "Chat Side/Chat Textarea Form",
  component: ChatTextareaForm,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof ChatTextareaForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { conversationId: "lwdjaflsjdflksfklsa" },
};
