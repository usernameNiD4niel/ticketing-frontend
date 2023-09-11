import { UserDataProps } from "@/constants/types";
import { create } from "zustand";
type State = {
  userData: UserDataProps;
};

type Action = {
  setUserData: (userData: State["userData"]) => void;
  reset: () => void;
};

const initialState: State = {
  userData: {
    role: "",
    name: "",
    password: "",
    otp: "",
    email: "",
    department: "",
  },
};

const useRegisterStore = create<State & Action>((set) => ({
  ...initialState,
  setUserData: (userData: State["userData"]) => set({ userData }),
  reset: () => set(initialState),
}));

export default useRegisterStore;
