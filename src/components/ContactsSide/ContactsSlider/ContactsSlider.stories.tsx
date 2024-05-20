import type { Meta, StoryObj } from "@storybook/react";
import { ContactSlider, testUsers } from ".";
import profilePicScr from "@/../public/pp.jpg";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Contacts Side/Contacts Slider",
  component: ContactSlider,
  parameters: {
    // layout: "padded",
    layout: "fullscreen",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ["autodocs"],

  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof ContactSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const withContacts: Story = {
  args: {
    showContacts: true,
    setShowContacts: () => {},
    contacts: testUsers,
  },
};
export const WithoutContacts: Story = {
  args: {
    showContacts: true,
    setShowContacts: () => {},
  },
};

// export const withNotification: Story = {
//   args: {
//     selected: false,
//     date: "11:33 AM",
//     username: "Simo Echaarani",
//     lastMessage: "Nice to meet you bro!",
//     notificationNumber: 3,
//     ppUrl: profilePicScr.src,
//   },
// };

// export const Selected: Story = {
//   args: {
//     selected: true,
//     date: "Friday",
//     username: "Simo Echaarani",
//     lastMessage: "Nice to meet you bro!",
//     notificationNumber: 0,
//     ppUrl: profilePicScr.src,
//   },
// };

// export const noProfilePic: Story = {
//   args: {
//     date: "Yesterday",
//     username: "Simo Echaarani",
//     lastMessage: "Nice to meet you bro!",
//     notificationNumber: 0,
//   },
// };
