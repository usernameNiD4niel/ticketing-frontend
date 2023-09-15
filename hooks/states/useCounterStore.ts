import { create } from "zustand";

type State = {
  pendingRoleCount: number;
  unhandledTicketsCount: number;
};

type Action = {
  setPendingRoleCount: (pendingRoleCount: number) => void;
  setUnhandledTicketsCount: (unhandledTicketsCount: number) => void;
  reset: () => void;
};

const initialState: State = {
  pendingRoleCount: 0,
  unhandledTicketsCount: 0,
};

const useCounterStore = create<State & Action>((set) => ({
  ...initialState,
  setPendingRoleCount: (pendingRoleCount: number) => set({ pendingRoleCount }),
  setUnhandledTicketsCount: (unhandledTicketsCount: number) =>
    set({ unhandledTicketsCount }),
  reset: () => set(initialState),
}));

export default useCounterStore;
