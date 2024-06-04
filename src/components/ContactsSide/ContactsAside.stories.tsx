import type { Meta, StoryObj } from "@storybook/react";
import { ContactsAside } from ".";
// import profilePicScr from "@/../public/pp.jpg";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Contacts Side/Contacts Aside",
  component: ContactsAside,
  parameters: {
    // layout: "padded",
    layout: "fullscreen",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ["autodocs"],

  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof ContactsAside>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const WithContacts: Story = {
  args: {
    initConversations: [],
    contacts: [],
  },
};
export const WithoutContacts: Story = {
  args: {
    initConversations: [],
    contacts: [],
  },
};
