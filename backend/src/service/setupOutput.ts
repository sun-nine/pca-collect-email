export const setupOutput = (status: boolean, message: string, data: any) => {
  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent(JSON.stringify({ status, message, data }));

  return output;
};
