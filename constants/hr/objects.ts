import { MenuTypes } from "./types";
import { MdDashboard } from "react-icons/md";
import { TbLayoutDashboard, TbBrandFeedly } from "react-icons/tb";
import { SiFeedly, SiGoogledocs } from "react-icons/si";
import { SlDocs } from "react-icons/sl";
import { PiUserCircleGearFill } from "react-icons/pi";
import { LuUserCog2 } from "react-icons/lu";
import { AiOutlinePoweroff } from "react-icons/ai";
import { FaPowerOff } from "react-icons/fa";
import { BsChatRightHeartFill, BsChatRightHeart } from "react-icons/bs";

export const menu: MenuTypes[] = [
  {
    activeIcon: MdDashboard,
    inactiveIcon: TbLayoutDashboard,
    text: "Dashboard",
    route: "/hr/dashboard",
  },
  {
    activeIcon: SiFeedly,
    inactiveIcon: TbBrandFeedly,
    text: "Feed",
    route: "/hr/feed",
  },
  {
    activeIcon: SiGoogledocs,
    inactiveIcon: SlDocs,
    text: "Application",
    route: "/hr/application",
  },
  {
    activeIcon: PiUserCircleGearFill,
    inactiveIcon: LuUserCog2,
    text: "Department Role",
    route: "/hr/department-role",
  },
  {
    activeIcon: BsChatRightHeartFill,
    inactiveIcon: BsChatRightHeart,
    text: "Requested Manpower",
    route: "/hr/requested-manpower",
  },
];

export const logout: MenuTypes = {
  activeIcon: FaPowerOff,
  inactiveIcon: AiOutlinePoweroff,
  route: "http://10.10.1.120:3000/login",
  text: "Logout",
};
