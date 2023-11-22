"use client";
import PendingRoleAssign from "@/components/utils/PendingRoleAssign";
import { UserProps } from "@/constants/types";
import RoleCard from "./role-card";
import { useState } from "react";

interface ContentProps {
  users: UserProps[];
}

export default function Content({ users }: ContentProps) {
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);

  console.log(`the content`);

  return (
    <>
      {users.map((user) => (
        <RoleCard
          selectedUserIds={selectedUserIds}
          setSelectedUserIds={setSelectedUserIds}
          user={user}
          key={user.id}
        />
      ))}

      {selectedUserIds.length > 0 && (
        // <Button className="fixed bottom-5 right-3 md:right-10">Create</Button>
        <PendingRoleAssign selectedUserIds={selectedUserIds} />
      )}
    </>
  );
}
