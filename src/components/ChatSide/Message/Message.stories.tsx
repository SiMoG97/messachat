import type { Meta, StoryObj } from "@storybook/react";
import { Message } from "./";

const meta = {
  title: "Chat Side/Message",
  component: Message,
  parameters: {
    layout: "fullscreen",
  },
  args: { time: "11:06 PM", status: "delivered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Message>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RightMessage: Story = {
  args: {
    direction: "right",
    message: "salam salut cv wach n9der nchofk db ?",
  },
};

export const LeftMessage: Story = {
  args: {
    direction: "left",
    message: "Chnahowa? goli be3da! n3ref be3da mnin nbda",
    status: "seen",
  },
};

const multiLineMessage = `Hello!
how are you doing 
i'm fine thanks 
what about you
`;

export const RightMessageMultiLines: Story = {
  args: {
    ...RightMessage.args,
    message: multiLineMessage,
  },
};

export const LeftMessageMultiLines: Story = {
  args: {
    ...LeftMessage.args,
    message: multiLineMessage,
  },
};
