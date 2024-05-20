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
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],

  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof CircleImage>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const sm: Story = {
  args: {
    size: "sm",
    src: profilePicScr.src,
  },
};
export const md: Story = {
  args: {
    size: "md",
    src: profilePicScr.src,
  },
};
export const lg: Story = {
  args: {
    size: "lg",
    src: profilePicScr.src,
  },
};
export const xl: Story = {
  args: {
    size: "xl",
    src: profilePicScr.src,
  },
};
