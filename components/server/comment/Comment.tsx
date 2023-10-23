import { Badge } from "@/components/ui/badge";
import { CommentProps } from "@/constants/types";
import { FC } from "react";

const Comment: FC<CommentProps> = ({
  comment,
  date_commented,
  department,
  name,
  access_level,
  time_commented,
}) => {
  const getVariant = (
    role: string
  ): "catalyst" | "champion" | "requestor" | "supreme" => {
    switch (role) {
      case "requestor":
        return "requestor";
      case "unset":
        return "requestor";
      case "catalyst":
        return "catalyst";
      case "champion":
        return "champion";
      case "supreme":
        return "supreme";
      default:
        return "requestor";
    }
  };

  return (
    <>
      <hr />
      <div className="flex items-center justify-center">
        <div className="w-full">
          <Badge
            variant={getVariant(access_level.toLowerCase())}
            className="text-xs font-light"
          >
            {access_level.toLowerCase()}
          </Badge>
          <h4 className="font-bold text-sm">
            {name} ✔ - ({department})
          </h4>
          <p className="text-sm">{comment}</p>
          <div className="flex items-center gap-x-2 mt-2">
            <p className="text-gray-400 text-xs">{time_commented}</p>
            <p className="text-gray-400 text-xs">|</p>
            <p className="text-gray-400 text-xs">{date_commented}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
