import ContentBody from "@/components/server/comment/ContentBody";
import Forms from "@/components/server/comment/Forms";
import { CommentInfoProps } from "@/constants/types";
import React, { FC } from "react";

type CommentBodyProps = {
  id: number;
  token: string;
};

type Props = {
  comments: CommentInfoProps[];
};

const getComments = async (id: number, token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/it-comments/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["it-comment"],
      },
    }
  );
  if (response.ok) {
    const data: Props = await response.json();
    const { comments } = data;
    return comments;
  }

  console.log("log", response);

  throw new Error(
    "Cannot fetch the comment for this ticket, pleas try again😥"
  );
};

const CommentBody: FC<CommentBodyProps> = async ({ id, token }) => {
  const comments = await getComments(id, token);

  return (
    <>
      <div className="flex flex-col gap-y-3 my-4">
        <ContentBody comments={comments} />
      </div>
      <Forms id={id} />
    </>
  );
};

export default CommentBody;
