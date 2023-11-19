import { copyFile } from "../../service/copyFile";
import { getMinutesTimeDiff } from "../../module/getMinutesTimeDiff";
import { generateQrCode } from "../../service/generateQrCode";
import { INPUT_FOLDER_ID, QR_FOLDER_ID } from "../../value";

// チェックする間隔（分）
const CHECK_MINUTES_TIME = 60;

// CSVの追加を監視する関数
export const csvFileChanges = () => {
  const intputFolder = DriveApp.getFolderById(INPUT_FOLDER_ID);
  const qrCodeFolder = DriveApp.getFolderById(QR_FOLDER_ID);

  const files = intputFolder.getFiles();

  while (files.hasNext()) {
    const file = files.next();

    const minutesTimeDiff = getMinutesTimeDiff(file);

    // Todo: CSVファイルか判定

    // 指定された時間内に作成されたファイルかチェック
    if (minutesTimeDiff < CHECK_MINUTES_TIME) {
      console.log(
        `${CHECK_MINUTES_TIME}分以内に追加されたファイルが見つかりました。` +
          `fileId=${file.getId()}` +
          `fileName=${file.getName()}`
      );

      // Todo: slackに通知

      // ファイルコピー
      const copiedFile = copyFile(file);
      console.log(
        `ファイルのコピーが生成されました。` +
          `fileId=${copiedFile.getId()}` +
          `fileName=${copiedFile.getName()}`
      );

      // フォルダ生成
      const newFolder = qrCodeFolder.createFolder(file.getName());
      console.log(
        `フォルダーが生成されました。` +
          `folderId=${newFolder.getId()}` +
          `folderName=${newFolder.getName()}`
      );

      // QRコードを生成
      generateQrCode(file, copiedFile, newFolder);
      console.log("QRコードが全て生成されました。");

      // Todo: slackに通知
    }
  }
};
