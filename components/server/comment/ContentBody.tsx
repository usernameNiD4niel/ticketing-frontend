import { CommentInfoProps, CommentsProps } from "@/constants/types";
import React, { FC } from "react";
import Comment from "./Comment";

type ContentBodyProps = {
  comments: CommentInfoProps[];
};

const ContentBody: FC<ContentBodyProps> = ({ comments }) => {
  if (comments && comments.length > 0) {
    console.log("comments: ", comments);
  } else {
    console.log("wala talga ", comments[0]);
  }

  const Element = () => {
    if (!comments) {
      return (
        <div className="h-[120px] w-full flex items-center justify-center">
          <h3 className="text-red-500 font-bold text-sm">
            Cannot retrieve the comment
          </h3>
        </div>
      );
    }

    if (comments && comments.length > 0) {
      return comments.map((com, index) => <Comment {...com} key={index} />);
    } else {
      return (
        <div className="h-full w-full flex items-center justify-center">
          <h3 className="md:text-sm text-xs">No comments found🍔</h3>
        </div>
      );
    }
  };
  return (
    <div className="flex flex-col gap-y-3 my-4 md:h-[400px] overflow-y-auto">
      <Element />
    </div>
  );
};

export default ContentBody;
