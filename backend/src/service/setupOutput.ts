export const setupOutput = (params: any) => {
  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent(JSON.stringify({ message: "success!", data: params }));

  return output;
};
