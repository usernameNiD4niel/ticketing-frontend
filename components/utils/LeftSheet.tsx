"use client";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { HiMenuAlt2 } from "react-icons/hi";
import { FaHome } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { BsTicketFill } from "react-icons/bs";
import { MdAccountBox } from "react-icons/md";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Link from "next/link";

const LeftSheet = () => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Sheet key={"left"}>
        <SheetTrigger asChild>
          <Button variant="outline" className="text-xl">
            <HiMenuAlt2 />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-[#EEF7FF]">
          <SheetHeader>
            <SheetTitle className="font-bold text-4xl mt-20">
              <Link href="/">
                <span className="text-[#0B64B9]">OP</span>
                <span className="text-[#99CC68]">PA</span>
              </Link>
            </SheetTitle>
          </SheetHeader>
          <section className="w-full items-start flex flex-col gap-y-3 mt-16">
            <Button className=" text-xl w-full" variant="primaryActive">
              <span className="w-full gap-x-4 flex items-center">
                <FaHome /> <span className="text-sm font-bold">Feed</span>
              </span>
            </Button>
            <Button className="text-xl w-full" variant="primaryInActive">
              <span className="w-full gap-x-4 flex items-center">
                <IoIosCreate />
                <span className="text-sm">Create Ticket</span>
              </span>
            </Button>
            <Button className="text-xl w-full" variant="primaryInActive">
              <span className="w-full gap-x-4 flex items-center">
                <BsTicketFill />
                <span className="text-sm">My Tickets</span>
              </span>
            </Button>
            <Button className="text-xl w-full" variant="primaryInActive">
              <span className="w-full gap-x-4 flex items-center">
                <MdAccountBox />
                <span className="text-sm">Account</span>
              </span>
            </Button>
          </section>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default LeftSheet;
