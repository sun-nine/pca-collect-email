import { FORM_URL } from "../value";

export const createQrCode = (queryParams: any) => {
  const encodedParams = Object.keys(queryParams)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`
    )
    .join("&");

  const url = `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${encodeURIComponent(
    FORM_URL + "?" + encodedParams
  )}`;

  const option = {
    method: "get",
    muteHttpExceptions: true,
  };
  const ajax = UrlFetchApp.fetch(url, option as any);

  return ajax.getBlob();
};
