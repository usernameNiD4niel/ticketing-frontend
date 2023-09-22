"use client";
import { Badge } from "@/components/ui/badge";
import BottomSheet from "@/components/utils/BottomSheet";
import EditCard from "@/components/utils/EditCard";
import RightSheet from "@/components/utils/RightSheet";
import { ActivitiesProps, FeedTicketProps } from "@/constants/types";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import Cookies from "js-cookie";
import { useAuth } from "@/hooks/auth";

const TicketPage = ({ params }: { params: { id: string } }) => {
  const [ticket, setTicket] = useState<FeedTicketProps | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [count, setCount] = useState(0);

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tabName");

  const id = params.id;

  const { getSpecificTicket, getActivitiesCount } = useAuth();

  const role = Cookies.get("role");
  const tabRole =
    role === "requestor"
      ? "/department/it/my-tickets"
      : "department/it/unhandled-tickets";

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
    }

    const getTicket = async () => {
      const response: FeedTicketProps = await getSpecificTicket({
        id,
        setIsFetching,
        token,
      });

      setTicket(response);
    };

    const getCount = async () => {
      await getActivitiesCount({
        id,
        token,
        setCount,
      });
    };

    getTicket();
    getCount();
  }, []);
  return (
    <section className="w-full">
      <ul className="flex gap-x-2 items-center text-xs">
        <li>
          <Link href={currentTab === "Feed" ? "/department/it" : tabRole}>
            {currentTab}
          </Link>
        </li>
        <li>
          <BsChevronRight />
        </li>
        <li>
          <Link href={`/department/it/${id}?tabName=${currentTab}`}>
            Ticket {params.id}
          </Link>
        </li>
      </ul>
      {isFetching ? (
        <div className="mt-20">
          <h3 className="font-bold">Trying to fetch ticket #{id}</h3>
        </div>
      ) : (
        <TicketContentViewer ticket={ticket} count={count} />
      )}
    </section>
  );
};
type T = {
  ticket: FeedTicketProps | null;
  count: number;
};

const TicketContentViewer: React.FC<T> = ({ ticket, count }) => {
  return (
    <React.Fragment>
      {ticket ? (
        <TicketContent ticket={ticket} count={count} />
      ) : (
        <div>No data found</div>
      )}
    </React.Fragment>
  );
};

type TicketContentProps = {
  ticket: FeedTicketProps;
  count: number;
};

const TicketContent: FC<TicketContentProps> = ({ count, ticket }) => {
  const role = Cookies.get("role");
  const token = Cookies.get("token");
  const email = Cookies.get("email");

  const { getSpecificNotification } = useAuth();

  const [activities, setActivities] = useState<ActivitiesProps | null>(null);
  const [error, setError] = useState("");
  const [isFetching, setIsFetching] = useState(true);

  // if true then the current user and the owner of the ticket is the same
  const [success, setSuccess] = useState(false);
  const [refetch, setRefetch] = useState(false);

  const { isUserOwnerOfTicket } = useAuth();
  useEffect(() => {
    if (role?.toLowerCase() === "requestor") {
      console.log("The current user is requestor");

      const name = ticket.name;

      if (token) {
        const verifyCurrentUser = async () => {
          await isUserOwnerOfTicket({ setSuccess, token, email, name });

          await getSpecificNotification({
            id: ticket.id,
            setActivities,
            setError,
            setIsFetching,
            token,
          });
        };
        verifyCurrentUser();
      }
    }
  }, [refetch]);

  const handleShowRightSheet = () => {
    getSpecificNotification({
      id: ticket.id,
      setActivities,
      setError,
      setIsFetching,
      token,
    });
  };

  return (
    <div className="mt-4 flex items-center justify-center mx-2 md:mx-0">
      <div className="max-w-6xl relative md:w-full">
        <div className="flex justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold my-2">#{ticket.id}</h1>
            <div className="space-x-1">
              <Badge>{ticket.priority.toUpperCase()}</Badge>
              <Badge>{ticket.status.toUpperCase()}</Badge>
            </div>
            <h3>Requestor: {ticket.name}</h3>
            <h3>Department: IT</h3>
            <p className="text-sm">
              Champion:
              {ticket.assigned_to
                ? ticket.assigned_to
                : "This ticket is not yet assigned"}
            </p>
          </div>
          <div className="text-end text-sm">
            <p>Posted Date: {ticket.created_at}</p>
            <p>Updated Date: {ticket.updated_at}</p>
            <p>
              Resolution Date:{" "}
              {ticket.resolved_date ? (
                ticket.resolved_date
              ) : (
                <>Not yet resolve</>
              )}
            </p>
          </div>
        </div>
        {/* Body of the Ticket */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold my-2">{ticket.subject}</h2>
          <p className="text-sm text-justify">{ticket.description}</p>
        </div>
        {role?.toLowerCase() !== "requestor" ? (
          <EditCard
            ticket={ticket}
            ticketNumber={`#${ticket.id}`}
            isTicketOwner={false}
            setRefetch={setRefetch}
          />
        ) : (
          success && (
            <EditCard
              ticket={ticket}
              ticketNumber={`#${ticket.id}`}
              isTicketOwner={true}
              setRefetch={setRefetch}
            />
          )
        )}
        <RightSheet
          activities={activities}
          error={error}
          isFetching={isFetching}
          handleShowRightSheet={handleShowRightSheet}
          count={count}
        />
        <BottomSheet ticket_id={ticket.id} />
      </div>
    </div>
  );
};

export default TicketPage;
