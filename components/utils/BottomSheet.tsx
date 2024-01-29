import { FC } from "react";
import { getCookies } from "next-client-cookies/server";
import CommentBody from "../client/comment/Body";

type BottomSheetProps = {
  ticket_id: number;
  isOpen: boolean;
};

const BottomSheet: FC<BottomSheetProps> = async ({ ticket_id, isOpen }) => {
  const token = getCookies().get("token");

  return (
    <div className="flex w-full">
      <div className="w-full">
        <h3 className="font-bold">Comments</h3>
        <p className="text-sm">Your comment will be publicly posted in here.</p>
        <CommentBody id={ticket_id} token={token!} isOpen={isOpen} />
      </div>
    </div>
  );
};

export default BottomSheet;
