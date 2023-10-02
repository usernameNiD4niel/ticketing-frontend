"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LoadingButton } from "@/components/utils/LoadingButton";
import { CommentInfoProps } from "@/constants/types";
import React, { FC, useState } from "react";
import Comment from "./Comment";

const postComment = async (
  id: number,
  token: string,
  comment: string,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  const response: CommentInfoProps = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/${id}`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ comment }),
    }
  )
    .then((data) => {
      const x = data.json();
      setError("");
      return x;
    })
    .catch((error) => {
      console.log(error);
      setError(
        "Can't post your comment, please refresh your browser or reset your internet"
      );
    });

  return response;
};

type FormsProps = {
  id: number;
  token: string;
  setComments: React.Dispatch<React.SetStateAction<CommentInfoProps[]>>;
};

const Forms: FC<FormsProps> = ({ id, token, setComments }) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePostComment = () => {
    if (!comment || !comment.trim()) {
      setError("Comment is required!");
      return;
    }

    setError("");
    setIsLoading(true);

    if (!error) {
      manipulator();
    }
    setIsLoading(false);
  };

  const manipulator = async () => {
    const comment_ = await postComment(id, token, comment, setError);
    setComments((prev) => [...prev, comment_]);
    setComment("");
  };

  return (
    <>
      <div className="mt-2">
        <Textarea
          placeholder="Enter your comment"
          className="w-full rounded-md"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
      <div className="flex flex-row justify-end items-center gap-2 mb-10">
        {isLoading ? (
          <LoadingButton isFullWidth={false} />
        ) : (
          <Button className="my-2 w-fit" onClick={handlePostComment}>
            Post Comment
          </Button>
        )}
      </div>
    </>
  );
};

export default Forms;
