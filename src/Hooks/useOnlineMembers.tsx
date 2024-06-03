import { create } from "zustand";

type OnlineMembersStoreT = {
  members: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  set: (id: string[]) => void;
};

export const useOnlineMembers = create<OnlineMembersStoreT>((set) => ({
  members: [],

  add: (id) =>
    set((state) => ({ members: [...new Set([...state.members, id])] })),
  remove: (id) =>
    set((state) => ({
      members: state.members.filter((memberId) => memberId !== id),
    })),
  set: (ids) => set({ members: ids }),
}));
