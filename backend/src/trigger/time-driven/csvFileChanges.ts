import { copyFile } from "../../service/copyFile";
import { getMinutesTimeDiff } from "../../module/getMinutesTimeDiff";
import { generateQrCode } from "../../service/generateQrCode";
import {
  INPUT_FOLDER_ID,
  QR_FOLDER_ID,
  OUTPUT_FOLDER_ID,
  PIC_EMAIL,
} from "../../value";
import { sendMailOfNotice } from "../../service/sendMailOfNotice";
import { isCsv } from "../../module/isCsv";
import { isUtf8 } from "../../module/isUtf8";
import { shiftJISCSVToArrays } from "../../service/shiftJISCSVToArrays";
import { convertShiftJISToUTF8 } from "../../module/convertShiftJISToUTF8";

// チェックする間隔（分）
const CHECK_MINUTES_TIME = 1;

// CSVの追加を監視する関数
export const csvFileChanges = () => {
  const intputFolder = DriveApp.getFolderById(INPUT_FOLDER_ID!);
  const qrCodeFolder = DriveApp.getFolderById(QR_FOLDER_ID!);
  const outputFolder = DriveApp.getFolderById(OUTPUT_FOLDER_ID!);

  const files = intputFolder.getFiles();

  while (files.hasNext()) {
    const file = files.next();
    const fileName = file.getName();
    const blob = file.getBlob();
    const minutesTimeDiff = getMinutesTimeDiff(file);

    if (!(minutesTimeDiff < CHECK_MINUTES_TIME)) continue;

    console.log(
      `${CHECK_MINUTES_TIME}分以内に追加されたファイルが見つかりました。` +
        `fileId=${file.getId()}` +
        `fileName=${fileName}`
    );

    if (!isCsv(blob)) {
      console.log("CSVファイル形式じゃありません。");
      sendMailOfNotice(
        `CSVファイル形式じゃありません。\nファイル名: ${fileName}`,
        PIC_EMAIL!
      );
      return;
    }

    if (isUtf8(blob)) {
      console.log("文字コードがutf-8になっています。shift_jisにしてください。");
      sendMailOfNotice(
        `文字コードがutf-8になっています。shift_jisにしてください。\nファイル名: ${fileName}`,
        PIC_EMAIL!
      );
      return;
    }

    // ファイルをutf-8に変換して保存
    const copiedFile = outputFolder.createFile(
      convertShiftJISToUTF8(blob, fileName)
    );
    console.log(
      `ファイルのコピーが生成されました。` +
        `fileId=${copiedFile.getId()}` +
        `fileName=${copiedFile.getName()}`
    );

    // // フォルダ生成
    const newFolder = qrCodeFolder.createFolder(fileName);
    console.log(
      `フォルダーが生成されました。` +
        `folderId=${newFolder.getId()}` +
        `folderName=${newFolder.getName()}`
    );

    // // QRコードを生成
    generateQrCode(file, copiedFile, newFolder);
    console.log("QRコードが全て生成されました。");
    sendMailOfNotice(
      `QRコードが生成されました。\nファイル名: ${fileName}`,
      PIC_EMAIL!
    );
  }
};
