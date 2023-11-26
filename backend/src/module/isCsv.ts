export const isCsv = (blob: GoogleAppsScript.Base.Blob) => {
  return blob.getContentType() === "text/csv";
};
