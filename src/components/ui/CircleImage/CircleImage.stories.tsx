import type { Meta, StoryObj } from "@storybook/react";
import { CircleImage } from ".";
import profilePicScr from "@/../public/pp.jpg";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "UI/Circle image",
  component: CircleImage,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      options: ["sm", "md", "lg", "xl"],
      control: { type: "radio" },
    },
  },
  args: {
    src: profilePicScr.src,
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],

  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof CircleImage>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Sm: Story = {
  args: { size: "sm" },
};
export const Md: Story = {
  args: { size: "md" },
};
export const Lg: Story = {
  args: { size: "lg" },
};
export const Xl: Story = {
  args: { size: "xl" },
};
