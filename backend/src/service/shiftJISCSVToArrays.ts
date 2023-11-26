export const shiftJISCSVToArrays = (blob: GoogleAppsScript.Base.Blob) => {
  const csvString = blob.getDataAsString("Shift_JIS");
  return Utilities.parseCsv(csvString);
};
