"use client";
import React, { FC, useState } from "react";
import AssignRoleDialog from "./assign-role-dialog";
import Card from "./card";
import { FetchingUsersRole } from "@/constants/hr/types";

interface ContentProps {
  users: FetchingUsersRole[];
}

const Content: FC<ContentProps> = ({ users }) => {
  const [ids, setIds] = useState<string[]>([]);
  const [user, setUser] = useState(users);

  return (
    <div className="flex flex-wrap gap-2">
      {users && users.length > 0 ? (
        user.map((user) => (
          <Card
            creation_date={user.created_at}
            department={user.department}
            name={user.name}
            ids={ids}
            id={user.id.toString()}
            setIds={setIds}
            key={user.id}
          />
        ))
      ) : (
        <div className="w-full h-[70vh] flex items-center justify-center text-center">
          No new accounts created yet!
        </div>
      )}
      {ids.length > 0 && (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6">
          <AssignRoleDialog ids={ids} setUser={setUser} />
        </div>
      )}
    </div>
  );
};

export default Content;
