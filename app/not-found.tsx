import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-2">
      <Image
        src={"/origdevexlogo.svg"}
        alt="Devex logo"
        className="w-[200px] h-auto"
        width={400}
        priority
        height={400}
      />
      <h2 className="font-bold text-2xl">Page not found</h2>
      <p>The page you&apos;re trying to access cannot be found.</p>
      <Link
        href="/"
        className="text-[#0B64B9] hover:underline underline-offset-1"
      >
        Return Home
      </Link>
    </div>
  );
}
