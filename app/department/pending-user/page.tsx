import { cookies } from "next/headers";
import Image from "next/image";
import DevexLogo from "@/public/origdevexlogo.svg";
import Link from "next/link";

type SearchParams = {
  user?: string;
};

type PendingUserPageProps = {
  searchParams: SearchParams;
};

export default async function PendingUserPage({
  searchParams,
}: PendingUserPageProps) {
  const email = cookies().get("email");

  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Image src={DevexLogo} alt="Devex logo" className="w-[300px] h-auto" />
        <p className="max-w-xl text-center">
          Hello {searchParams.user ?? "user"}, currently the IT Department is
          validating your request. We will notify you via email at{" "}
          <span className="underline underline-offset-1 text-[#0B64B9]">
            {email?.value}
          </span>{" "}
          for the update. Thank you!
        </p>
        <Link
          href={"/login"}
          className="p-3 bg-[#0B64B9] rounded-md text-white text-sm mt-5"
        >
          Use another account
        </Link>
      </div>
    </div>
  );
}
