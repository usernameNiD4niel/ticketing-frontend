"use client";
import { postComment } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LoadingButton } from "@/components/utils/LoadingButton";
import React, { FC, useState } from "react";

type FormsProps = {
  id: number;
};

const Forms: FC<FormsProps> = ({ id }) => {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const commentAction = postComment.bind(null, id.toString());

  const handleFormAction = (formData: FormData) => {
    commentAction(formData);
    setIsLoading(false);
    setComment("");
  };

  const handleFormSubmit = () => {
    setIsLoading(true);
  };

  return (
    <form
      className="w-full"
      action={handleFormAction}
      onSubmit={handleFormSubmit}
    >
      <div className="mt-2">
        <Textarea
          placeholder="Enter your comment"
          className="w-full rounded-md"
          onChange={(e) => setComment(e.target.value)}
          name="comment"
          value={comment}
        />
      </div>
      <div className="flex flex-row justify-end items-center gap-2 mb-10">
        {isLoading ? (
          <LoadingButton isFullWidth={false} />
        ) : (
          <Button className="my-2 w-fit">Post Comment</Button>
        )}
      </div>
    </form>
  );
};

export default Forms;
