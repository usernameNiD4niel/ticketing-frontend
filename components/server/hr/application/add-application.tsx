"use client";
import { uploadCVFile } from "@/firebase/uploading-file";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Cookies from "js-cookie";
import { FC, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsCheckAll, BsCheckLg } from "react-icons/bs";
import { BiSolidErrorCircle } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { useRouter } from "next/navigation";
import { updateSpecificApplication } from "@/endpoints";
import { ApplicationTypes, PostApplicationTypes } from "@/constants/hr/types";

const createApplication = async (postData: PostApplicationTypes) => {
  const token = Cookies.get("token");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/applications`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    }
  )
    .then((data) => data.json())
    .then((data) => {
      console.log(`hr ::: ${data.hr}`);

      return data.success as boolean;
    })
    .catch((error) => {
      console.error(`error here... ${error}`);
      return false;
    });

  return response;
};

interface AddApplicationProps {
  application: ApplicationTypes | null;
}

const AddApplication: FC<AddApplicationProps> = ({ application = null }) => {
  const [applicant, setApplicant] = useState(application?.applicant);
  const [position, setPosition] = useState(application?.position);
  const [notes, setNotes] = useState(application?.notes || "");
  const [file, setFile] = useState<File | null>(null);

  const [applicantError, setApplicantError] = useState("");
  const [positionError, setPositionError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const performUpdate = async () => {
    let url;

    if (file) {
      url = await uploadCVFile(file);
    } else {
      url = null;
    }

    const updateData: PostApplicationTypes = {
      applicant: applicant!,
      cv_resume: url || application?.cv_resume || null,
      notes: notes || application?.notes || null,
      position: position!,
    };

    const token = Cookies.get("token");
    const message = await updateSpecificApplication(
      application!.id.toString(),
      token!,
      updateData
    );

    if (message && message === "Application successfully updated") {
      setSuccessMessage(message);
      setErrorMessage("");
    } else {
      setSuccessMessage("");
      if (message) {
        setErrorMessage(message);
      } else {
        setErrorMessage("Please refresh the page and try again.");
      }
    }
  };

  const handleOnSubmit = (form: React.FormEvent<HTMLFormElement>) => {
    form.preventDefault();

    if (application) {
      performUpdate();
      return;
    }

    if (!applicant) {
      setApplicantError("Applicant cannot be empty");
      return;
    }

    if (applicant.length <= 3) {
      setApplicantError("Please enter a valid applicant name");
      return;
    }

    setApplicantError("");

    if (!position) {
      setPositionError("Position cannot be empty");
      return;
    }

    setPositionError("");
    setIsLoading(true);

    if (file) {
      getUri(file);
      // If HR uploaded resume
      // ...
    } else {
      noResumeUploaded();
      console.log("Else");
    }
  };

  const noResumeUploaded = async () => {
    const postData: PostApplicationTypes = {
      applicant: applicant!,
      cv_resume: null,
      notes: notes || null,
      position: position!,
    };
    const success = await createApplication(postData);
    updateUI(success, "Successfully added new applicant record!");
  };

  const getUri = async (file: File) => {
    const url = await uploadCVFile(file);
    console.log(`the uri : ${url}`);

    const postData: PostApplicationTypes = {
      applicant: applicant!,
      cv_resume: url,
      notes: notes || null,
      position: position!,
    };

    if (url && url.length > 0) {
      const success = await createApplication(postData);
      updateUI(success, "Successfully added new applicant record!");
    } else {
      setIsLoading(false);
    }
  };

  const updateUI = (isSucess: boolean, message: string) => {
    setIsLoading(false);
    if (isSucess) {
      setErrorMessage("");
      setSuccessMessage(message);
      router.refresh();
      return;
    }
    setSuccessMessage("");
    setErrorMessage("Requestor or un-assigned role cannot use this form!");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {!application ? (
          <Button className="text-white p-0 w-12 h-12 lg:w-fit lg:h-fit bg-[#879FFF] flex gap-1 rounded-full lg:rounded-md lg:px-6 lg:py-3 text-base hover:bg-[#7a90e7]">
            <span className="text-2xl">
              <IoMdAdd />
            </span>
            <span className="hidden lg:block">Add</span>
          </Button>
        ) : (
          <Button
            className="hover:text-white hover:bg-[#879FFF]"
            variant={"outline"}
          >
            <FiEdit />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] py-10 px-6">
        <DialogHeader>
          <DialogTitle>Add new applicant</DialogTitle>
        </DialogHeader>
        <form className="w-full space-y-4" onSubmit={handleOnSubmit}>
          {successMessage && (
            <div className="rounded-md relative bg-green-600 text-white p-4 flex gap-2 items-center">
              <span className="text-lg">
                <BsCheckLg />
              </span>
              <p className="text-sm">{successMessage}</p>
              <div
                className="absolute right-0 top-0 m-2 text-base cursor-pointer"
                onClick={() => setSuccessMessage("")}
              >
                <AiOutlineClose />
              </div>
            </div>
          )}
          {errorMessage && (
            <div className="rounded-md relative bg-red-600 text-white p-4 flex gap-2 items-center">
              <span className="text-lg">
                <BiSolidErrorCircle />
              </span>
              <p className="text-sm">{errorMessage}</p>
              <div
                className="absolute right-0 top-0 m-2 text-base cursor-pointer"
                onClick={() => setErrorMessage("")}
              >
                <AiOutlineClose />
              </div>
            </div>
          )}
          <Label className="flex flex-col gap-2 w-full">
            <span>Applicant</span>
            <Input
              placeholder="Name"
              value={applicant}
              onChange={(e) => setApplicant(e.target.value)}
            />
            {applicantError && (
              <span className="text-red-500 text-sm">{applicantError}</span>
            )}
          </Label>
          <Label className="flex flex-col gap-2 w-full">
            <span>Position</span>
            <Input
              placeholder="Position applying for"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
            {positionError && (
              <span className="text-red-500 text-sm">{positionError}</span>
            )}
          </Label>
          <Label className="flex flex-col gap-2 w-full">
            <span>
              Notes <span className="font-thin">(Optional)</span>
            </span>
            <Textarea
              placeholder="Create a notes for this application"
              onChange={(e) => setNotes(e.target.value)}
              value={notes}
            />
          </Label>
          <div className="w-full space-y-1 relative">
            <Label className="flex items-center gap-x-2">
              Upload Resume/CV <span className="font-thin">(Optional)</span>
              {application && application.cv_resume && (
                <span className="text-green-400 text-xs flex items-center">
                  <span className="text-lg">
                    <BsCheckAll />
                  </span>
                  CV is present
                </span>
              )}
            </Label>
            <Input
              className="w-full cursor-pointer h-32 border-dotted border rounded-md border-gray-600 flex items-center justify-center"
              type="file"
              accept=".pdf"
              onChange={(e) => {
                const files = e.target.files;
                if (files) {
                  setFile(files[0]);
                }
              }}
            />
          </div>
          <div className="w-full flex justify-end items-center py-2 gap-3">
            <DialogClose asChild>
              <Button type="button" variant={"ghost"}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              Save changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddApplication;
