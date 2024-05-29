import { type Conversation, type Message, type User } from "@prisma/client";
import { z } from "zod";

export type MessageType = Message & {
  sender: User;
  seen: User[];
};

export type ConversationType = Conversation & {
  users: User[];
  messages: MessageType[];
};

export const SettingsFromSchema = z.object({
  name: z.string().min(1).max(25).optional(),
  bio: z.string().min(1).max(80).optional(),
  image: z.string().optional(),
});

export type SettingsFormType = z.infer<typeof SettingsFromSchema>;
