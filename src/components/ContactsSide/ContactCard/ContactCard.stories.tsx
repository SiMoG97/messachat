import type { Meta, StoryObj } from "@storybook/react";
import { ContactCard } from ".";
import profilePicScr from "@/../public/pp.jpg";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Contacts Side/ContactCard",
  component: ContactCard,
  parameters: {
    layout: "fullscreeen",
  },
  args: {
    handleClick: () => {
      return;
    },
    date: "5/11/2024",
    name: "Simo Echaarani",
    lastMessage: "Nice to meet you bro!",
    notificationNumber: 0,
    image: profilePicScr.src,
  },

  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],

  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof ContactCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const WitoutNotification: Story = {
  args: {
    date: "5/11/2024",
  },
};

export const WithNotification: Story = {
  args: {
    date: "11:33 AM",
    notificationNumber: 3,
  },
};

export const Selected: Story = {
  args: {
    selected: true,
    date: "Friday",
    notificationNumber: 0,
  },
};

export const NoProfilePic: Story = {
  args: {
    date: "Yesterday",
    image: null,
  },
};
