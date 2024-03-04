import { Comment } from "@/constants/hr/types";
import React from "react";

interface SideCommentsProps {
  comment: Comment;
}

const SideComments = ({ comment }: SideCommentsProps) => {
  return (
    <div className="flex gap-4 flex-col justify-between px-4 py-3 rounded-md bg-white drop-shadow hover:border-s-4 border-[#879FFF] transition-colors duration-300 ease-in-out">
      <div>
        <h3 className="font-semibold text-sm">{comment.name}</h3>
        <p className="text-sm">{comment.comment}</p>
      </div>
      <p className="text-gray-500 text-xs font-light">{comment.created_at}</p>
    </div>
  );
};

export default SideComments;
