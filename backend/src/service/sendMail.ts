import { COMPANY_NAME, PIC, PIC_EMAIL } from "../value";

export const sendMail = (
  clientName1: string,
  clientName2: string,
  companyAbbreviation: string,
  recipient: string
) => {
  const subject = "アドレス登録ありがとうございます"; //件名

  const body =
    `${clientName1} ${clientName2} ${companyAbbreviation}\n` +
    `\n拝啓\n
    貴社におかれましては益々ご隆盛のこととお慶び申し上げます。\n
    この度、弊社の請求書電子化にご協力いただき誠にありがとうございます。\n
    今後、請求書電子化のURLを発行させていただきます。\n
    宜しくお願い致します。\n
    ------------------------------\n
    ${COMPANY_NAME}\n
    アドレス収集担当\n
    ${PIC}\n
    ${PIC_EMAIL}\n`;

  const options = {
    name: PIC!,
    from: PIC_EMAIL!,
  };

  GmailApp.sendEmail(recipient, subject, body, options);
};
