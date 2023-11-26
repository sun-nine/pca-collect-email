import { addEmailToParsedCSV } from "../../module/addEmailToParsedCSV";
import { checkCustomerIDAndName } from "../../module/checkCustomerIDAndName";
import { utf8CSVToArrays } from "../../module/utf8CSVToArrays";
import { setupOutput } from "../../service/setupOutput";
import { sendMail } from "../../service/sendMail";
import { sendMailOfNotice } from "../../service/sendMailOfNotice";
import { PIC_EMAIL } from "../../value";

export const doPost = (e: GoogleAppsScript.Events.DoPost) => {
  const params = JSON.parse(e.postData.contents);
  const {
    clientId, // !
    clientName1, // !
    clientName2,
    companyAbbreviation,
    fileId, // !
    fileName, // !
    email, // !
  } = params;

  // Todo: バリデーション
  // 1. 必須パラメーター
  // 2. データ型（email）
  // 3. その他（ファイルIDとファイル名が正しい ＆＆ 顧客IDと名前の組み合わせが存在する）

  const file = DriveApp.getFileById(fileId);

  // ファイルの存在確認
  if (!file) {
    const message = "ファイルが存在しません。" + `fileId=${fileId}`;
    console.log(message);
    const output = setupOutput(false, message, params);
    return output;
  }

  // ファイル名確認
  if (file.getName() !== fileName) {
    const message = "ファイル名が正しくありません。" + `fileName=${fileName}`;
    console.log(message);
    const output = setupOutput(false, message, params);
    return output;
  }

  const arrays = utf8CSVToArrays(file.getBlob());

  // 顧客IDと会社名の一致を確認
  const isCorrectCustomer = checkCustomerIDAndName(
    arrays,
    clientId,
    clientName1
  );
  if (!isCorrectCustomer) {
    const message =
      "顧客が存在しません。" +
      `clientId=${clientId}` +
      `clientName1=${clientName1}`;
    console.log(message);
    const output = setupOutput(false, message, params);
    return output;
  }

  // メールをセット
  const serializedCSVData = addEmailToParsedCSV(arrays, clientId, email)
    .map((row) => row.join(","))
    .join("\n");

  file.setContent(serializedCSVData);

  // サンクスメールを送信
  sendMail(clientName1, clientName2, companyAbbreviation, email);

  sendMailOfNotice(
    `メールアドレスが収集されました。\nファイル名: ${fileName}\n顧客ID: ${clientId}\n顧客名: ${clientName1}`,
    PIC_EMAIL!
  );

  const output = setupOutput(true, "success", params);
  return output;
};
