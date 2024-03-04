import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FiSearch } from "react-icons/fi";
import DialogContentFilter from "../helper/dialog-content-filter";

// TODO: request to the endpoint of application/search
// TODO: update the search indicator data with the queried data
// TODO: create a delay for each press before querying to the database/server

const UI = async () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="fixed lg:relative text-lg flex items-center justify-center drop-shadow-lg lg:drop-shadow-none hover:bg-[#7a90e7]  hover:cursor-pointer lg:hover:cursor-auto bottom-20 lg:bottom-0 rounded-full bg-[#879FFF] w-12 h-12 lg:w-auto lg:h-auto right-2">
          <span className="lg:absolute left-5 top-[1.09rem] text-white lg:text-black/50 cursor-pointer">
            <FiSearch />
          </span>
          <Input
            placeholder="Search..."
            className="w-[380px] rounded-full bg-[#EDEDED] hidden lg:flex ps-11 py-6 cursor-pointer"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="w-[80%] md:w-full p-0 m-0 rounded-lg flex items-center gap-0 flex-col top-40">
        <DialogContentFilter />
      </DialogContent>
    </Dialog>
  );
};

export default UI;
