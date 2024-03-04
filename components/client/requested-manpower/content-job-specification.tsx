import HighlightedText from "@/components/server/hr/helper/highlighted-text";
import React, { FC } from "react";

interface ContentJobSpecificationProps {
  age: string;
  work_experience: string;
  gender: string;
  education: string;
  certification_training: string;
  course_degree: string;
  special_skills_and_qualifications: string;
}

const ContentJobSpecification: FC<ContentJobSpecificationProps> = ({
  age,
  certification_training,
  course_degree,
  education,
  gender,
  special_skills_and_qualifications,
  work_experience,
}) => {
  return (
    <>
      <h1 className="font-bold">JOB SPECIFICATION</h1>
      <div className="flex justify-between">
        <div className="space-y-3">
          <p className="space-x-1">
            <span>AGE</span>
            <HighlightedText text={age} />
          </p>
          <p className="space-x-1">
            <span>WORK EXPERIENCE</span>
            <HighlightedText text={work_experience} />
          </p>
          <p className="space-x-1">
            <span>GENDER</span>
            <HighlightedText text={gender} />
          </p>
          <p className="space-x-1">
            <span>EDUCATION</span>
            <HighlightedText text={education} />
          </p>
        </div>
        <div className="space-y-3">
          <p className="space-x-1">
            <span>CERTIFICATION/TRAINING</span>
            <HighlightedText text={certification_training} />
          </p>
          <p className="space-x-1">
            <span>COURSE/DEGREE</span>
            <HighlightedText text={course_degree} />
          </p>
          <p className="space-x-1 flex items-center w-fit text-center md:text-start">
            <span className="bg-slate-100 text-left">
              SPECIAL SKILLS AND <br className="md:hidden" /> QUALIFICATIONS
            </span>
            <HighlightedText text={special_skills_and_qualifications} />
          </p>
        </div>
      </div>
    </>
  );
};

export default ContentJobSpecification;
