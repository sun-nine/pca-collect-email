export const csvToArrays = (file: GoogleAppsScript.Drive.File) => {
  const csvString = file.getBlob().getDataAsString("Shift_JIS");
  const arrays = Utilities.parseCsv(csvString);

  return arrays;
};
