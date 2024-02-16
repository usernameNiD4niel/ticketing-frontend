import { ModeToggle } from "@/components/utils/ModeToggle";
import Image from "next/image";
import Link from "next/link";
import RegisterForm from "@/components/client/register/register-form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Register = () => {
  const token = cookies().get("token")?.value;

  if (token) {
    redirect("/");
  }

  return (
    <main className="w-full grid md:grid-cols-[1fr_50%] lg:grid-cols-[1fr_40%] xl:grid-cols-[1fr_30%] h-screen">
      <section className="hidden md:flex bg-black overflow-hidden relative">
        <Image
          alt="Construction Image"
          src="/signup.jpg"
          width={1350}
          height={400}
        />
        <div className="absolute inset-0 bg-black opacity-70 transition-opacity flex flex-col justify-end duration-300 ease-in hover:opacity-80 group p-4">
          <h1 className="font-bold text-5xl flex flex-col gap-y-4 text-white group-hover:text-7xl transition-all duration-300 ease-in">
            <span>WE MAKE</span> <span>EXCELLENCE A</span> <span>HABIT</span>
          </h1>
        </div>
      </section>
      <section className="px-8 flex flex-col gap-y-7 mt-4 w-full">
        <div className="w-full flex items-center justify-end">
          <ModeToggle />
        </div>
        <Link href="/" className="w-full flex justify-center mb-5 mt-5">
          <Image
            alt="Devex Logo"
            src="./origdevexlogo.svg"
            width={120}
            height={120}
          />
        </Link>
        <div>
          <h1 className="text-4xl font-bold">Register to start</h1>
          <p className="font-light">
            Let&#39;s fix your day to day struggle and make your life easier
          </p>
        </div>
        <RegisterForm />
      </section>
    </main>
  );
};

export default Register;
