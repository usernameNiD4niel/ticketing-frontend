import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/utils/ModeToggle";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";
import { Button } from "@/components/ui/button";
import { DialogBox } from "@/components/utils/DialogBox";

const Login = () => {
  return (
    <main className="w-full grid md:grid-cols-[50%_1fr] lg:grid-cols-[40%_1fr] xl:grid-cols-[30%_1fr] h-screen">
      <section className="px-8 flex flex-col gap-y-7 mt-4 w-full">
        <div className="w-full flex items-center justify-end">
          <ModeToggle />
        </div>
        <Link
          href="/"
          className="w-full flex justify-center mb-5 mt-5 lg:mt-24"
        >
          <Image
            alt="Devex Logo"
            src="./origdevexlogo.svg"
            width={120}
            height={120}
          />
        </Link>
        <div>
          <h1 className="text-4xl font-bold">Welcome back!</h1>
          <p className="font-light">Login to continue your progress with us</p>
        </div>
        <form className="flex flex-col gap-y-6">
          <Label htmlFor="email" className={styles.labels}>
            Email
            <Input
              placeholder="juantamad@devexsolutions.com"
              type="email"
              id="email"
              name="email"
            />
          </Label>
          <Label htmlFor="password" className={styles.labels}>
            Password
            <Input
              placeholder="Enter your password"
              id="password"
              type="password"
              name="password"
            />
          </Label>
          <div className="flex text-sm justify-end items-center">
            <DialogBox />
          </div>
          <Button>LOGIN</Button>
          <Label className="text-sm md:text-base font-normal w-full text-center">
            Don't have an account yet?{" "}
            <Link href="/register" className="font-bold text-[#0B64B9]">
              Register
            </Link>
          </Label>
        </form>
      </section>
      <section className="hidden md:flex bg-black overflow-hidden relative">
        <Image
          alt="Construction Image"
          src="/house.jpg"
          width={1350}
          height={400}
        />
        <div className="absolute inset-0 bg-black opacity-60 transition-opacity duration-300 ease-in hover:opacity-70 group p-4">
          <h1 className="font-bold text-5xl text-end flex flex-col gap-y-4 text-white group-hover:text-7xl transition-all duration-300 ease-in">
            <span>WE MAKE</span> <span>EXCELLENCE A</span> <span>HABIT</span>
          </h1>
          <div className="w-full flex justify-end items-center">
            <p className="opacity-0 group-hover:opacity-100 text-white transition-opacity duration-700 ease-in-out text-end max-w-xs">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Recusandae, temporibus. Quidem quisquam, minima, ex ipsam totam
              unde sapiente, architecto fugiat in exercitationem ipsum dolore!
              Id, fugiat! Expedita inventore unde voluptatum tenetur amet
              laborum eligendi repudiandae exercitationem similique earum?
              Placeat molestias est voluptas. Tenetur eveniet eum, officiis quae
              sed inventore adipisci?
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
