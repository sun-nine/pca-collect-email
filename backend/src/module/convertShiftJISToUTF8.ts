export const convertShiftJISToUTF8 = (
  blob: GoogleAppsScript.Base.Blob,
  fileName: string
) => {
  return Utilities.newBlob(
    blob.getDataAsString("Shift_JIS"),
    "text/csv",
    `${fileName}`
  );
};
