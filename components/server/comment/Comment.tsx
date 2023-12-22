import { Badge } from "@/components/ui/badge";
import { CommentProps } from "@/constants/types";
import { FC } from "react";
import HoverName from "./hover-name";

const Comment: FC<CommentProps> = ({
  comment,
  date_commented,
  department,
  name,
  access_level,
  time_commented,
  user_joined_on,
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

  const convertTextToHTML = (text: string) => {
    const formattedText = text.replace(/\r\n|\n|\r/g, "<br />"); // Replace newline characters with <br />

    return { __html: formattedText };
  };

  return (
    <>
      <hr />
      <div className="flex items-center justify-center">
        <div className="w-full">
          <div>
            <Badge
              variant={getVariant(access_level.toLowerCase())}
              className="text-xs font-light"
            >
              {access_level.toLowerCase()}
            </Badge>
          </div>
          <HoverName
            name={name}
            department={department}
            joinedOn={user_joined_on}
          />
          {/* <h4 className="font-bold text-sm">
            {name} ✔ - ({department})
          </h4> */}
          <p
            className="text-sm"
            dangerouslySetInnerHTML={convertTextToHTML(comment)}
          />
          <div className="flex items-center gap-x-2 mt-2">
            <p className="text-gray-400 text-xs">{date_commented}</p>
            <p className="text-gray-400 text-xs">|</p>
            <p className="text-gray-400 text-xs">{time_commented}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
