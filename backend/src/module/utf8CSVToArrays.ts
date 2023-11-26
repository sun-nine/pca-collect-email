export const utf8CSVToArrays = (blob: GoogleAppsScript.Base.Blob) => {
  const csvString = blob.getDataAsString();
  return Utilities.parseCsv(csvString);
};
