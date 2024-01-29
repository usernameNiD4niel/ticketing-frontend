import ContentBody from "@/components/server/comment/ContentBody";
import Forms from "@/components/server/comment/Forms";
import { CommentInfoProps } from "@/constants/types";
import React, { FC } from "react";

type CommentBodyProps = {
  id: number;
  token: string;
  isOpen: boolean;
};

const getComments = async (id: number, token: string) => {
  //it-comments/156
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/it-comments/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: [`it-comment-${id}`],
      },
    }
  );
  if (response.ok) {
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));

    return data.comments as CommentInfoProps[];
  }

  console.log("log", response);

  throw new Error(
    "Cannot fetch the comment for this ticket, pleas try again😥"
  );
};

const CommentBody: FC<CommentBodyProps> = async ({ id, token, isOpen }) => {
  const comments = await getComments(id, token);

  return (
    <>
      <Forms id={id} isOpen={isOpen} />
      <div className="flex flex-col gap-y-3 my-4">
        <ContentBody comments={comments} />
      </div>
    </>
  );
};

export default CommentBody;
