import { AvailableTabs } from "@/constants/hr/enums";

export const getCurrentTab = (activeTab: AvailableTabs) => {
  switch (activeTab) {
    case AvailableTabs.Dashboard:
      return "Dashboard";

    case AvailableTabs.Feed:
      return "Feed";
    case AvailableTabs.Application:
      return "Application";
    case AvailableTabs["Department Role"]:
      return "Department Role";
    case AvailableTabs["Requested Manpower"]:
      return "Requested Manpower";
    default:
      return "Logout";
  }
};
