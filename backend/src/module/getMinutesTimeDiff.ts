export const getMinutesTimeDiff = (file: GoogleAppsScript.Drive.File) => {
  // 現在時刻
  const currentTime = Date.now();

  // ファイル作成時刻
  const createTime = file.getDateCreated().getTime();

  const timeDiff = (currentTime - createTime) / (60 * 1000);

  return timeDiff;
};
