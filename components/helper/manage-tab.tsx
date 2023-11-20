"use client";

import useCounterStore from "@/hooks/states/useCounterStore";
import useNavigationStore from "@/hooks/states/useNavigationStore";
import { useEffect } from "react";

interface ManageTabProps {
  unset_user_count: number;
  user_priority_ticket_count: number;
}

export default function ManageTab({
  unset_user_count,
  user_priority_ticket_count,
}: ManageTabProps) {
  const [setPendingRoleCount, setUnhandledTicketsCount] = useCounterStore(
    (state) => [state.setPendingRoleCount, state.setUnhandledTicketsCount]
  );

  useEffect(() => {
    setPendingRoleCount(unset_user_count);
    setUnhandledTicketsCount(user_priority_ticket_count);
  }, []);

  return <></>;
}
