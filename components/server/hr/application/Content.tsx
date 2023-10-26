import { Button } from "@/components/ui/button";
import React from "react";
import { FiEdit } from "react-icons/fi";

const Content = () => {
  return (
    <div className="w-full h-[85vh] py-6 px-12 rounded-md border overflow-y-auto bg-white text-[#879FFF] border-[#879FFF]">
      <div className="w-full flex justify-end items-center">
        <Button variant={"outline"}>
          <FiEdit />
        </Button>
      </div>
      <div className="flex justify-between mt-4">
        <div className="space-y-2">
          <h3 className="text-primary font-bold text-5xl">QS Engineer</h3>
          <p className="font-bold text-2xl text-[#879FFF]">Juan Dela Cruz</p>
          <ul className="space-y-2">
            <li className="">
              <span className="font-bold">Creator</span>{" "}
              <span>Coco Martin</span>
            </li>
            <li>
              <span className="font-bold">CV / Resume</span>{" "}
              <Button variant={"outline"}>View</Button>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm text-end">Created at: 10 . 11 . 2023</p>
          <p className="text-sm text-end">Updated at: 10 . 11 . 2023</p>
        </div>
      </div>
      <div className="mt-12">
        <h3 className="font-bold">Note</h3>
        <p className="text-justify text-sm md:text-base">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor
          distinctio exercitationem quas necessitatibus labore possimus aperiam
        </p>
      </div>
    </div>
  );
};

export default Content;
