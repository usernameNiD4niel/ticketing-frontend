"use client";

import { AiOutlineComment } from "react-icons/ai";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
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
import { FC } from "react";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";

const BottomSheet = () => {
  return (
    <div className="fixed bottom-4 md:bottom-8 right-1 md:right-8 text-2xl flex bg-stone-900 text-stone-50 hover:bg-stone-900/90 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-50/90 rounded-full w-12 h-12 items-center justify-center hover:cursor-pointer">
      {/* <div className="grid grid-cols-2 gap-2"> */}
      <Sheet key={"bottom"}>
        <SheetTrigger asChild>
          <Button
            variant="noVariant"
            className="text-center flex items-center justify-center rounded-full w-12 h-12"
          >
            <span className="text-xl">
              <AiOutlineComment />
            </span>
            <span className="text-[0.65rem] absolute top-2 right-2">+9</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side={"bottom"}
          className="max-h-[700px] max-w-3xl mx-auto top-[15%] overflow-auto"
        >
          <SheetHeader>
            <SheetTitle>Comments</SheetTitle>
            <SheetDescription>
              Your comment will be publicly posted in here.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-y-3 my-4">
            <Comment
              comment="This is a sample comment"
              name="Daniel Rey"
              role="Requestor"
            />
            <Comment
              comment="This is a sample comment 2"
              name="Sir Doni"
              role="Catalyst"
            />
            <Comment
              comment="This is a sample comment 3"
              name="Sir Bry"
              role="Champion"
            />
            <Comment
              comment="This is a sample comment"
              name="Daniel Rey"
              role="Requestor"
            />
            <Comment
              comment="This is a sample comment 2"
              name="Sir Doni"
              role="Catalyst"
            />
            <Comment
              comment="This is a sample comment 3"
              name="Sir Bry"
              role="Champion"
            />
            <Comment
              comment="This is a sample comment"
              name="Daniel Rey"
              role="Requestor"
            />
            <Comment
              comment="This is a sample comment 2"
              name="Sir Doni"
              role="Catalyst"
            />
            <Comment
              comment="This is a sample comment 3"
              name="Sir Bry"
              role="Champion"
            />
          </div>
          <div className="mt-10">
            <Textarea
              placeholder="Enter your comment"
              className="w-full rounded-md my-4"
            />
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="button" variant="ghost" className="my-2">
                Cancel
              </Button>
            </SheetClose>
            <Button className="my-2">Post Comment</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

type CommentProps = {
  role: string;
  name: string;
  comment: string;
};

const Comment: FC<CommentProps> = ({ comment, name, role }) => {
  const getVariant = (role: string): "catalyst" | "champion" | "requestor" => {
    switch (role) {
      case "Requestor":
        return "requestor";
      case "Unset":
        return "requestor";
      case "Catalyst":
        return "catalyst";
      case "Champion":
        return "champion";
      default:
        return "requestor";
    }
  };

  return (
    <>
      <hr />
      <div className="space-y-2">
        <Badge variant={getVariant(role)} className="text-xs font-light">
          {role}
        </Badge>
        <h4 className="font-medium">{name}</h4>
        <p className="text-xs">{comment}</p>
      </div>
    </>
  );
};
export default BottomSheet;
