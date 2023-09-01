import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/utils/ModeToggle";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./styles.module.css";
import { ComboboxDemo } from "@/components/utils/ComboBox";

const Register = () => {
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
          <div className="w-full flex items-center">
            <p className="opacity-0 group-hover:opacity-100 text-white transition-opacity duration-700 ease-in-out max-w-xs">
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
            Let's fix your day to day struggle and make your life easier
          </p>
        </div>
        <form className="flex flex-col gap-y-6">
          <Label htmlFor="fullName" className={styles.labels}>
            FullName
            <Input
              placeholder="Juan Tamad"
              type="fullName"
              id="fullName"
              name="fullName"
              required
            />
          </Label>
          <Label htmlFor="email" className={styles.labels}>
            Email
            <Input
              placeholder="juantamad@devexsolutions.com"
              type="email"
              id="email"
              name="email"
              required
            />
          </Label>
          <Label className={styles.labels}>
            Department
            <ComboboxDemo />
          </Label>
          <Label htmlFor="password" className={styles.labels}>
            Password
            <Input
              placeholder="Enter your password"
              id="password"
              type="password"
              required
              name="password"
            />
          </Label>
          <Label htmlFor="confirmPassword" className={styles.labels}>
            Confirm Password
            <Input
              placeholder="Confirm your confirmPassword"
              id="confirmPassword"
              type="confirmPassword"
              required
              name="confirmPassword"
            />
          </Label>
          <Button>SIGN UP</Button>
          <Label className="text-sm md:text-base font-normal w-full text-center">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-[#0B64B9]">
              Login
            </Link>
          </Label>
        </form>
      </section>
    </main>
  );
};

export default Register;
