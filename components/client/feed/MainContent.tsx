"use client";
import MobileDrawer from "@/components/utils/MobileDrawer";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface MainContentProps {
  children: React.ReactNode;
  user_priority_ticket_count: number;
  unset_user_count: number;
}

export default function MainContent({
  children,
  unset_user_count,
  user_priority_ticket_count,
}: MainContentProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  return (
    <>
      <MobileDrawer
        setIsDrawerOpen={setIsDrawerOpen}
        isDrawerOpen={isDrawerOpen}
        unhandledTicketsCount={user_priority_ticket_count}
        pendingRoleCount={unset_user_count}
      />
      <section
        className={cn(
          "w-full flex flex-col gap-y-4 px-2 md:px-9",
          isDrawerOpen ? "md:ml-[350px]" : "md:ml-20"
        )}
      >
        {children}
      </section>
    </>
  );
}
