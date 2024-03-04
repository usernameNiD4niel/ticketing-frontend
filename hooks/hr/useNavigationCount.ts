import { create } from "zustand";

type State = {
  requestedManpowerCount: number;
  departmentRoleCount: number;
};

type Action = {
  setRequestedManpowerCount: (requestedManpowerCount: number) => void;
  setDepartmentRoleCount: (departmentRoleCount: number) => void;
  reset: () => void;
};

const initialState: State = {
  requestedManpowerCount: 0,
  departmentRoleCount: 0,
};

const useNavigationActivityCount = create<State & Action>((set) => ({
  ...initialState,
  reset: () => set(initialState),
  setDepartmentRoleCount: (departmentRoleCount: number) =>
    set({ departmentRoleCount }),
  setRequestedManpowerCount: (requestedManpowerCount: number) =>
    set({ requestedManpowerCount }),
}));

export default useNavigationActivityCount;
