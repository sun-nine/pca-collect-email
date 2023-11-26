import { OUTPUT_FOLDER_ID } from "../value";

export const copyFile = (file: GoogleAppsScript.Drive.File) => {
  const outputFolder = DriveApp.getFolderById(OUTPUT_FOLDER_ID!);
  const fileName = file.getName();
  const copiedFile = file.makeCopy(fileName, outputFolder);

  return copiedFile;
};
