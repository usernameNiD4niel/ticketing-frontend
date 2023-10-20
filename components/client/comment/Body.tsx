"use client";
import ContentBody from "@/components/server/comment/ContentBody";
import Forms from "@/components/server/comment/Forms";
import { CommentInfoProps } from "@/constants/types";
import React, { FC, useEffect, useState } from "react";

type CommentBodyProps = {
  id: number;
  token: string;
};

type Props = {
  comments: CommentInfoProps[];
};

const getComments = async (id: number, token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (response.ok) {
    const data: Props = await response.json();
    const { comments } = data;
    return comments;
  } else {
  }
};

const CommentBody: FC<CommentBodyProps> = ({ id, token }) => {
  const [comments, setComments] = useState<CommentInfoProps[]>([]);

  const getComments_ = async () => {
    const comments_ = await getComments(id, token);
    if (comments_) {
      setComments(comments_);
    }
  };

  useEffect(() => {
    getComments_();
  }, []);
  return (
    <>
      <div className="flex flex-col gap-y-3 my-4">
        <ContentBody comments={comments} />
      </div>
      <Forms id={id} token={token} setComments={setComments} />
    </>
  );
};

export default CommentBody;
