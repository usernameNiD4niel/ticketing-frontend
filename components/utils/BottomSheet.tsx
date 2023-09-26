"use client";

import { AiOutlineComment } from "react-icons/ai";
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
import { FC, useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";
import { useAuth } from "@/hooks/auth";

import Cookies from "js-cookie";
import { LoadingButton } from "./LoadingButton";
import { CommentProps } from "@/constants/types";

type BottomSheetProps = {
  ticket_id: number;
};

const BottomSheet: FC<BottomSheetProps> = ({ ticket_id }) => {
  const { postComment, getComments, getCommentsCount } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");
  const token = Cookies.get("token");
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [count, setCount] = useState(0);

  const handlePostComment = () => {
    if (!comment) {
      setError("Comment cannot be empty!");
      return;
    }

    if (token) {
      createComment();
      setComment("");
    }
  };

  const createComment = async () => {
    setIsLoading(true);
    await postComment({
      comment,
      setError,
      setIsLoading,
      ticket_id,
      token,
    });
  };

  useEffect(() => {
    if (token) {
      getComments({
        setComments,
        setError,
        setIsFetching,
        ticket_id,
        token,
      });

      getCommentsCount({
        id: ticket_id,
        setCount,
        token,
      });
    }
  }, [isLoading]);

  const ContentBody = () => {
    if (error) {
      return (
        <div className="h-[120px] w-full flex items-center justify-center">
          <h3 className="text-red-500 font-bold text-sm">{error}</h3>
        </div>
      );
    }
    if (isFetching) {
      return (
        <div className="h-[120px] w-full flex items-center justify-center">
          <h3 className="font-bold text-sm">Comments are fetched...</h3>
        </div>
      );
    }
  };

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
            <span className="text-[0.65rem] absolute top-2 right-1 font-bold">
              {count != 0 && <>+{count}</>}
            </span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side={"bottom"}
          className=" max-w-3xl mx-auto top-0 md:top-[15%] overflow-auto h-full md:h-fit"
        >
          <SheetHeader>
            <SheetTitle>Comments</SheetTitle>
            <SheetDescription>
              Your comment will be publicly posted in here.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-y-3 my-4 md:h-[400px] overflow-y-auto">
            <ContentBody />

            {comments.length === 0 ? (
              <div className="h-[120px] w-full flex items-center justify-center">
                <h3>No data found</h3>
              </div>
            ) : (
              comments.map((com, index) => (
                <Comment
                  comment={com.comment}
                  date_commented={com.date_commented}
                  name={com.name}
                  role={com.role}
                  time_commented={com.time_commented}
                  key={index}
                />
              ))
            )}
          </div>
          <div className="mt-10 mb-4">
            <Textarea
              placeholder="Enter your comment"
              className="w-full rounded-md"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            <p className="text-red-500 text-sm mt-2">{error}</p>
          </div>
          <SheetFooter className="flex flex-row justify-end items-center gap-2">
            <SheetClose asChild>
              <Button type="button" variant="ghost" className="my-2 w-fit">
                Cancel
              </Button>
            </SheetClose>
            {isLoading ? (
              <LoadingButton isFullWidth={false} />
            ) : (
              <Button className="my-2 w-fit" onClick={handlePostComment}>
                Post Comment
              </Button>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

const Comment: FC<CommentProps> = ({ comment, name, role, date_commented }) => {
  const getVariant = (role: string): "catalyst" | "champion" | "requestor" => {
    switch (role) {
      case "requestor":
        return "requestor";
      case "unset":
        return "requestor";
      case "catalyst":
        return "catalyst";
      case "champion":
        return "champion";
      default:
        return "requestor";
    }
  };

  return (
    <>
      <hr />
      <div>
        <Badge
          variant={getVariant(role.toLowerCase())}
          className="text-xs font-light"
        >
          {role.toLowerCase()}
        </Badge>
        <h4 className="font-bold text-sm">{name}</h4>
        <p className="text-sm">{comment}</p>
        <p className="text-gray-400 text-xs mt-2">{date_commented}</p>
      </div>
    </>
  );
};
export default BottomSheet;
