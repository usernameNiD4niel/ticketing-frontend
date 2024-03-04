import { FC, useState } from "react";
import Card from "./card";
import { ApplicationTypes } from "@/constants/hr/types";

interface ApplicationListProps {
  applications: ApplicationTypes[];
  setId: React.Dispatch<React.SetStateAction<number>>;
  id: number;
}

const ApplicationList: FC<ApplicationListProps> = ({ applications, setId }) => {
  const result: number[] = Array.from(
    { length: applications.length },
    (_, index) => (index === 0 ? 1 : 0)
  );

  const [signals, setSignals] = useState(result);

  return (
    <div className="w-full flex gap-y-2 flex-col lg:overflow-y-auto lg:h-[85vh] scroll-smooth scrollbar-thin scrollbar-thumb-gray-300  scrollbar-track-gray-200 pe-1">
      {applications.map((application, index) => (
        <Card
          applicant={application.applicant}
          createdOn={application.created_at}
          creator={application.creator}
          cvAttached={application.cv_resume ? "attached" : "No attachment"}
          position={application.position}
          setSignals={setSignals}
          setId={setId}
          id={application.id}
          key={application.id}
          signals={signals}
          index={index}
        />
      ))}
    </div>
  );
};

export default ApplicationList;
