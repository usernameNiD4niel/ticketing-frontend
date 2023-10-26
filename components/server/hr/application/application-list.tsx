import { FC } from "react";
import Card from "./card";

interface ApplicationListProps {
  //   applications: ApplicationTypes[];
}

const ApplicationList: FC<ApplicationListProps> = () => {
  return (
    <div className="w-full space-y-2 md:overflow-y-auto h-[85vh] scroll-smooth scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 pe-1">
      <Card
        applicant="Juan Dela Cruz"
        createdOn="10 . 25 . 2023"
        creator="Coco Martin"
        cvAttached={"attached"}
        position="QS Engineer"
        key={1}
      />
      <Card
        applicant="Juan Dela Cruz"
        createdOn="10 . 25 . 2023"
        creator="Coco Martin"
        cvAttached={"attached"}
        position="QS Engineer"
        key={2}
      />
      <Card
        applicant="Juan Dela Cruz"
        createdOn="10 . 25 . 2023"
        creator="Coco Martin"
        cvAttached={"attached"}
        position="QS Engineer"
        key={3}
      />
      <Card
        applicant="Juan Dela Cruz"
        createdOn="10 . 25 . 2023"
        creator="Coco Martin"
        cvAttached={"attached"}
        position="QS Engineer"
        key={4}
      />
      <Card
        applicant="Juan Dela Cruz"
        createdOn="10 . 25 . 2023"
        creator="Coco Martin"
        cvAttached={"attached"}
        position="QS Engineer"
        key={5}
      />
      <Card
        applicant="Juan Dela Cruz"
        createdOn="10 . 25 . 2023"
        creator="Coco Martin"
        cvAttached={"attached"}
        position="QS Engineer"
        key={1}
      />
      <Card
        applicant="Juan Dela Cruz"
        createdOn="10 . 25 . 2023"
        creator="Coco Martin"
        cvAttached={"attached"}
        position="QS Engineer"
        key={2}
      />
      <Card
        applicant="Juan Dela Cruz"
        createdOn="10 . 25 . 2023"
        creator="Coco Martin"
        cvAttached={"attached"}
        position="QS Engineer"
        key={3}
      />
      <Card
        applicant="Juan Dela Cruz"
        createdOn="10 . 25 . 2023"
        creator="Coco Martin"
        cvAttached={"attached"}
        position="QS Engineer"
        key={4}
      />
      <Card
        applicant="Juan Dela Cruz"
        createdOn="10 . 25 . 2023"
        creator="Coco Martin"
        cvAttached={"attached"}
        position="QS Engineer"
        key={5}
      />
      <Card
        applicant="Juan Dela Cruz"
        createdOn="10 . 25 . 2023"
        creator="Coco Martin"
        cvAttached={"attached"}
        position="QS Engineer"
        key={1}
      />
      <Card
        applicant="Juan Dela Cruz"
        createdOn="10 . 25 . 2023"
        creator="Coco Martin"
        cvAttached={"attached"}
        position="QS Engineer"
        key={2}
      />
      <Card
        applicant="Juan Dela Cruz"
        createdOn="10 . 25 . 2023"
        creator="Coco Martin"
        cvAttached={"attached"}
        position="QS Engineer"
        key={3}
      />
      <Card
        applicant="Juan Dela Cruz"
        createdOn="10 . 25 . 2023"
        creator="Coco Martin"
        cvAttached={"attached"}
        position="QS Engineer"
        key={4}
      />
      <Card
        applicant="Juan Dela Cruz"
        createdOn="10 . 25 . 2023"
        creator="Coco Martin"
        cvAttached={"attached"}
        position="QS Engineer"
        key={5}
      />
    </div>
  );
};

export default ApplicationList;
