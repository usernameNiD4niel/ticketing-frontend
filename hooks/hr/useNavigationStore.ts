import { AvailableTabs } from "@/constants/hr/enums";
import { create } from "zustand";

type State = {
  activeTab: AvailableTabs;
};

type Action = {
  setActiveTab: (activeTab: State["activeTab"]) => void;
  reset: () => void;
};

const initialState: State = {
  activeTab: AvailableTabs.Feed,
};

const useNavigateStore = create<State & Action>((set) => ({
  ...initialState,
  reset: () => set(initialState),
  setActiveTab: (activeTab: State["activeTab"]) => set({ activeTab }),
}));

export default useNavigateStore;
