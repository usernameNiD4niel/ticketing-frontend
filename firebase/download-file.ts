import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { app } from "./initializer";
import { getNoSpacingDateToday } from "../constants/date-utils";

const storage = getStorage(app);

export const downloadCVFile = async (fileName: string): Promise<string> => {
  const file = ref(
    storage,
    `gs://devex-inc.appspot.com/${getNoSpacingDateToday()}/${fileName}`
  );

  const download = await getDownloadURL(file)
    .then((url) => {
      return url;
    })
    .catch((error) => {
      console.log("the error : " + error);
      return "";
    });
  return download;
};
