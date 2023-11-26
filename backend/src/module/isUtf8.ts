export const isUtf8 = (blob: GoogleAppsScript.Base.Blob) => {
  const utf8Data = blob.getDataAsString("utf-8");

  // 文字化けがない場合はtrue、utf8Data.includes("�")　= false
  return !utf8Data.includes("�");
};
