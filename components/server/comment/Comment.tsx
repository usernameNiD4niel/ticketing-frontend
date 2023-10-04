import { Badge } from "@/components/ui/badge";
import { CommentProps } from "@/constants/types";
import { FC } from "react";

const Comment: FC<CommentProps> = ({
  comment,
  date_commented,
  department,
  name,
  role,
  time_commented,
}) => {
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
      <div className="flex items-center justify-center">
        <div className="w-full">
          <Badge
            variant={getVariant(role.toLowerCase())}
            className="text-xs font-light"
          >
            {role.toLowerCase()}
          </Badge>
          <h4 className="font-bold text-sm">
            {name} ✔ - ({department})
          </h4>
          <p className="text-sm">{comment}</p>
          <p className="text-gray-400 text-xs mt-2">{date_commented}</p>
        </div>
        <p className="text-gray-400 text-xs">{time_commented}</p>
      </div>
    </>
  );
};

export default Comment;
