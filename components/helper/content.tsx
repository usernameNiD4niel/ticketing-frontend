import { FC } from "react";
import { cookies } from "next/headers";
import ContentBasicInformation from "../client/requested-manpower/content-basic-information";
import ContentEmploymentStatus from "../client/requested-manpower/content-employment-status";
import ContentEquipment from "../client/requested-manpower/content-equipment";
import ContentHeader from "../client/requested-manpower/content-header";
import ContentJobSpecification from "../client/requested-manpower/content-job-specification";
import { RequestedManpower } from "@/constants/hr/types";

interface ContentProps {
  slug: string;
}

const getSpecifiedManpower = async (id: string) => {
  const token = cookies().get("token")?.value;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/manpower/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data.manpower as RequestedManpower;
  }

  throw new Error("Cannot get the requested manpower");
};

const Content: FC<ContentProps> = async ({ slug }) => {
  const manpower = await getSpecifiedManpower(slug);

  return (
    <div className="w-full flex flex-col gap-y-6 mt-2 text-xs md:text-sm">
      <div className="w-full flex justify-between gap-6">
        <ContentHeader
          created_at={manpower.created_at}
          updated_at={manpower.updated_at}
          assigned_to={manpower.assign_to || "Not yet assigned to anyone"}
        />
      </div>
      <hr />
      <div className="space-y-1">
        <ContentBasicInformation
          department={manpower.department}
          no_employees_required={manpower.no_employees_required}
          position={manpower.position}
          position_level={manpower.position_level || "None"}
          position_required={manpower.position_required || "None"}
          project_location={manpower.project_or_location || "None"}
          requisitioner={manpower.requisitioner}
        />
      </div>
      <hr />
      <div className="w-full">
        <ContentEmploymentStatus
          employment_status={manpower.employment_status.status}
          project_duration_from={
            manpower.employment_status.project_duration_from || "None"
          }
          project_duration_to={
            manpower.employment_status.project_duration_to || "None"
          }
          justification={manpower.justification || "None"}
        />
      </div>
      <hr />
      <div className="space-y-2">
        <ContentJobSpecification
          age={manpower.job_specification.age}
          certification_training={
            manpower.job_specification.certification_training || "None"
          }
          course_degree={manpower.job_specification.courses_degree || "None"}
          education={manpower.job_specification.education}
          gender={manpower.job_specification.gender || "None"}
          special_skills_and_qualifications={
            manpower.job_specification.special_skills_and_qualifications ||
            "None"
          }
          work_experience={manpower.job_specification.work_experience || "None"}
        />
      </div>
      <hr />
      <div>
        <h2 className="font-bold mb-2">EQUIPMENT</h2>
        <ContentEquipment
          laptop={true}
          access_card={true}
          table_drawer={false}
        />
      </div>
    </div>
  );
};

export default Content;
