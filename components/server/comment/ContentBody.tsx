import { CommentInfoProps } from "@/constants/types";
import React, { FC } from "react";
import Comment from "./Comment";
import TicketActivity from "./ticket-activity";

type ContentBodyProps = {
  comments: CommentInfoProps[];
};

const ContentBody: FC<ContentBodyProps> = ({ comments }) => {
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
      return comments.map((com, index) => {
        return <Comment {...com} key={index} />;
        // if (com.is_comment) {
        // }

        // // * show activity
        // return <TicketActivity {...com} key={index} />;
      });
    } else {
      return (
        <div className="h-full w-full flex items-center justify-center">
          <h3 className="md:text-sm text-xs">No comments found🍔</h3>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col gap-y-4 my-4 ">
      <Element />
    </div>
  );
};

export default ContentBody;
