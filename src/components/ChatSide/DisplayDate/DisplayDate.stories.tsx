import { type Meta, type StoryObj } from "@storybook/react";
import { DisplayDate } from "./";

const meta = {
  title: "Chat Side/DisplayDate",
  component: DisplayDate,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof DisplayDate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    date: "Yesterday",
  },
};
