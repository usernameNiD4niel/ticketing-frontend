import Link from "next/link";
import DisplayMenu from "./display-menu";
import { cookies } from "next/headers";
import { getNavigationActivityCount } from "@/endpoints/requested-manpower";

const Menu = async () => {
  const token = cookies().get("token")?.value;

  const { r, d } = await getNavigationActivityCount(token!);

  return (
    <div className="flex flex-col pb-4 md:pb-0 pt-16 items-center w-full md:px-6 gap-y-6 h-screen">
      <Link href={"http://10.10.1.120:3000"} className="font-bold text-4xl">
        <span className="text-[#0B64B9]">OP</span>
        <span className="text-[#99CC68]">PA</span>
      </Link>
      <ul className="w-full flex flex-col my-6 justify-between h-full">
        <DisplayMenu drCount={d} rmCount={r} />
      </ul>
    </div>
  );
};

export default Menu;
