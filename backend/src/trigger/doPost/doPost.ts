import { addEmailToParsedCSV } from "../../module/addEmailToParsedCSV";
import { checkCustomerIDAndName } from "../../module/checkCustomerIDAndName";
import { csvToArrays } from "../../module/csvToArrays";
import { setupOutput } from "../../service/setupOutput";
import { sendMail } from "../../service/sendMail";

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

  if (!file) {
    console.log("ファイルが存在しません。" + `fileId=${fileId}`);
    return;
  }

  if (file.getName() !== fileName) {
    console.log("ファイル名が正しくありません。" + `fileName=${fileName}`);
    return;
  }

  const arrays = csvToArrays(file);

  const isCorrectCustomer = checkCustomerIDAndName(
    arrays,
    clientId,
    clientName1
  );
  if (!isCorrectCustomer) {
    console.log(
      "顧客が存在しません。" +
        `clientId=${clientId}` +
        `clientName1=${clientName1}`
    );
    return;
  }

  // メールをセット
  const serializedCSVData = addEmailToParsedCSV(arrays, clientId, email)
    .map((row) => row.join(","))
    .join("\n");

  file.setContent(serializedCSVData);

  // サンクスメールを送信
  sendMail(clientName1, clientName2, companyAbbreviation, email);

  const output = setupOutput(params);

  return output;
};
