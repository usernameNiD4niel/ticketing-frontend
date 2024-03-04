import { getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "./initializer";
import { downloadCVFile } from "./download-file";
import { getNoSpacingDateToday } from "@/constants/date-utils";

const storage = getStorage(app);

export const uploadCVFile = (file: File) => {
  const storageRef = ref(storage, `${getNoSpacingDateToday()}/${file.name}`);
  const data = uploadBytes(storageRef, file)
    .then(async () => {
      const uri = await downloadCVFile(file.name);
      return uri;
    })
    .catch(() => "");
  return data;
};
