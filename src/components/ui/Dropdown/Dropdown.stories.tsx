import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from ".";

const meta = {
  title: "UI/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ContactsDropdown: Story = {
  // args: {
  //   showContacts: true,
  //   setShowContacts: () => {},
  //   contacts: Dropdown,
  // },
};
