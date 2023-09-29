import { FeedTicketProps } from "@/constants/types";
import { getCookies } from "next-client-cookies/server";
import BreadCrumbs from "./breadcrumbs";
import TicketContentViewer from "./ticket-content-viewer";

type ResponseProps = {
  ticket: FeedTicketProps;
  success: boolean;
  message?: string;
};

type CountResponse = {
  "activity-count": number;
};

const getTicketData = async (id: string, token: string) => {
  const ticketData = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/all-tickets/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (ticketData.ok) {
    const data: ResponseProps = await ticketData.json();
    return data;
  } else {
    throw new Error(
      "Cannot get ticket information, please refresh your browser or reset your internet"
    );
  }
};

const getActivities = async (id: string, token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/activities/${id}/count`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    const count: CountResponse = await response.json();
    return count;
  } else {
    const noCount: CountResponse = {
      "activity-count": 0,
    };
    return noCount;
  }
};

const TicketPage = async ({ params }: { params: { id: string } }) => {
  const token = getCookies().get("token");
  const role = getCookies().get("role");

  const id = params.id;

  const ticketData: ResponseProps = await getTicketData(id, token!);

  const { "activity-count": count }: CountResponse = await getActivities(
    id,
    token!
  );

  console.log("data...", JSON.stringify(ticketData.ticket));

  const tabRole =
    role === "requestor" ? "/department/it/my-tickets" : "unhandled-tickets";

  const ContentBody = () => {
    if (!ticketData.success) {
      return (
        <div className="flex items-center justify-center w-full h-[80vh]">
          <p className="text-center mx-4">{ticketData.message}</p>
        </div>
      );
    }

    if (ticketData.success && ticketData.ticket) {
      return (
        <TicketContentViewer ticket={ticketData.ticket} count={count} id={id} />
      );
    }

    return (
      <div className="flex items-center justify-center w-full h-[80vh]">
        <p className="text-center mx-4">
          Please refresh your browser or reset your internet{" "}
          <span className="text-xl">😪</span>
        </p>
      </div>
    );
  };

  return (
    <section className="container">
      <BreadCrumbs id={id} tabRole={tabRole} />
      <ContentBody />
    </section>
  );
};

export default TicketPage;
