import { CommentInfoProps, CommentProps } from "@/constants/types";
import { FC } from "react";
import HoverName from "./hover-name";

const Comment: FC<CommentInfoProps> = ({
  created_at,
  created_time,
  comment,
  department,
  name,
  user_joined_on,
  is_comment,
  details,
}) => {
  const convertTextToHTML = (text: string) => {
    const formattedText = text.replace(/\r\n|\n|\r/g, "<br />"); // Replace newline characters with <br />

    return { __html: formattedText };
  };

  return (
    <>
      <div className="w-full flex flex-col">
        <div className="flex gap-x-2">
          {is_comment ? (
            <HoverName
              name={name!}
              department={department!}
              joinedOn={user_joined_on!}
            />
          ) : (
            <h6 className="text-indigo-500">SYSTEM: </h6>
          )}
          <p
            className="text-sm text-justify"
            dangerouslySetInnerHTML={convertTextToHTML(
              is_comment ? comment! : details!
            )}
          />
        </div>
        <div className="flex items-center gap-x-2">
          <p className="text-gray-400 text-xs">{created_at},</p>
          <p className="text-gray-400 text-xs">{created_time}</p>
        </div>
      </div>
    </>
  );
};

export default Comment;
