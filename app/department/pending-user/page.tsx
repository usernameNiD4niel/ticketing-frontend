import Image from "next/image";
import DevexLogo from "@/public/origdevexlogo.svg";
import Link from "next/link";

type SearchParams = {
  user?: string;
  email?: string;
};

type PendingUserPageProps = {
  searchParams: SearchParams;
};

export default async function PendingUserPage({
  searchParams,
}: PendingUserPageProps) {
  function getFirstName() {
    const splittedFullName = searchParams.user?.split(" ");

    if (splittedFullName) {
      let firstName = "";
      for (let i = 0; i < splittedFullName.length - 1; ++i) {
        firstName += splittedFullName[i];
      }
      return firstName;
    }

    return "Anonymous User";
  }

  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 p-4">
        <Image
          src={DevexLogo}
          alt="Devex logo"
          className="w-[160px] md:w-[250px] h-auto"
        />
        <p className="max-w-xl text-center text-sm md:text-base flex flex-col gap-2">
          <span>
            Hello {getFirstName()}! We have received your registration request.
            Please wait for the IT department to validate your request we will
            notify you via{" "}
            <span className="underline underline-offset-1 text-[#0B64B9]">
              {searchParams.email}
            </span>{" "}
            <span>
              If you have not receive an email within 48 hours please call us at
              86333839 local 142
            </span>
          </span>
        </p>
        <Link
          href={"/login"}
          className="p-3 bg-[#0B64B9] rounded-md text-white text-sm mt-5"
        >
          Return to login screen
        </Link>
      </div>
    </div>
  );
}
