"use client";
import { commentAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { FC, useState } from "react";
import { useFormStatus } from "react-dom"; // ! create a pending state instead of doing this
import { IoIosSend } from "react-icons/io";

interface SideCommentFormProps {
  id: string;
}

const SideCommentForm: FC<SideCommentFormProps> = ({ id }) => {
  const createComment = commentAction.bind(null, Number(id));

  const [comment, setComment] = useState("");

  const handleAction = (formData: FormData) => {
    createComment(formData);
    setComment("");
  };

  return (
    <form action={handleAction} className="relative">
      <FormContent comment={comment} setComment={setComment} />
    </form>
  );
};

interface FormContentProps {
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
}

function FormContent({ comment, setComment }: FormContentProps) {
  const { pending } = useFormStatus();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  return (
    <>
      <Input
        placeholder="Comment here"
        name="comment"
        className="py-6"
        autoFocus
        value={comment}
        onChange={handleOnChange}
      />

      <Button
        disabled={pending}
        className="absolute text-white bg-[#879FFF] right-1 top-1 text-xl hover:bg-[#879FFF]/80"
        variant={"secondary"}
      >
        <IoIosSend />
      </Button>
    </>
  );
}

export default SideCommentForm;
