import {
  RequestedManpowerZip,
  StatusAndAssignTo,
  UnassignedCount,
} from "@/constants/hr/types";

export async function getStatusAndAssignTo(token: string, id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/manpower/${id}/status-assign-to`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data as StatusAndAssignTo;
  }

  throw new Error("Cannot get the status and assign to");
}

export async function updateStatusAndAssignTo(
  token: string,
  id: string,
  statusAndAssignTo: StatusAndAssignTo
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/manpower/${id}/status-assign-to`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(statusAndAssignTo),
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data.message as string;
  }

  throw new Error("Cannot update the status and assign to");
}

export async function getNavigationActivityCount(token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/manpower/unassigned/count`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data as UnassignedCount;
  }

  throw new Error("Cannot get the count of the navigation activities");
}

export async function getPaginatedData(token: string, page: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/manpower?page=${page}&per_page=10`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status === 200) {
    const data = await response.json();
    return data as RequestedManpowerZip;
  }

  throw new Error("Cannot the page queried" + response.status);
}
