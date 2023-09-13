import { AvailableTabs } from "@/constants/enums";
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

const useNavigationStore = create<State & Action>((set) => ({
  ...initialState,
  setActiveTab: (activeTab: State["activeTab"]) => set({ activeTab }),
  reset: () => set(initialState),
}));

export default useNavigationStore;
