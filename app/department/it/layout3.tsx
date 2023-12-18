import Header from "@/components/utils/Header";
import { ModeToggle } from "@/components/utils/ModeToggle";
import React, { Suspense } from "react";
import ManageTab from "@/components/helper/manage-tab";
import MainContent from "@/components/client/feed/MainContent";
import Loading from "@/app/department/it/loading";

const HelperLayout = ({
  children,
  unset_user_count,
  user_priority_ticket_count,
  my_assigned_tickets,
  count,
}: {
  children: React.ReactNode;
  unset_user_count: number;
  user_priority_ticket_count: number;
  my_assigned_tickets: number;
  count: number;
}) => {
  return (
    <>
      <ManageTab
        unset_user_count={unset_user_count}
        user_priority_ticket_count={user_priority_ticket_count}
      />
      <header className="flex w-full md:hidden items-center justify-between z-10 drop-shadow-md p-2 bg-[#EEF7FF] dark:bg-[#0C0A09] dark:drop-shadow-md h-16 fixed top-0 left-0">
        <Header
          unhandledTicketsCount={user_priority_ticket_count}
          pendingRoleCount={unset_user_count}
          myAssignedTickets={my_assigned_tickets}
          count={count}
        />
      </header>
      <main className="mt-20 md:mt-10 w-full flex items-center justify-center">
        <MainContent
          unset_user_count={unset_user_count}
          user_priority_ticket_count={user_priority_ticket_count}
          my_assigned_tickets={my_assigned_tickets}
          count={count}
        >
          {/* {children} */}
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </MainContent>
      </main>
      <footer className="fixed bottom-0 md:bottom-12 left-0 p-4 z-10">
        <ModeToggle />
      </footer>
    </>
  );
};

export default HelperLayout;
