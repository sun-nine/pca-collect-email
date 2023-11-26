import { createQrCode } from "./createQrCode";
import { saveFileToDrive } from "./saveFileToDrive";

export const generateQrCode = (
  file: GoogleAppsScript.Drive.File,
  copiedFile: GoogleAppsScript.Drive.File,
  newFolder: GoogleAppsScript.Drive.Folder
) => {
  const csvString = file.getBlob().getDataAsString("Shift_JIS");
  const arrays = Utilities.parseCsv(csvString);

  console.log("QRコード生成処理開始");

  arrays.forEach((row, i) => {
    if (i < 1) return;

    console.log(`${i}行目を処理中`);

    // 得意先ID: スペース含む文字列
    const clientId = row[0];
    console.log("clientId", clientId);
    const clientName1 = row[1];

    const queryParams = {
      clientId: clientId,
      clientName1: clientName1,
      clientName2: row[2],
      companyAbbreviation: row[3],
      fileId: copiedFile.getId(),
      fileName: file.getName(),
    };

    const fileBlob = createQrCode(queryParams);
    saveFileToDrive(fileBlob, `${clientId + clientName1}`, newFolder);
  });

  console.log("QRコード生成処理終了");
};
