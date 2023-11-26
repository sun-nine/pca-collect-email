import { PIC, PIC_EMAIL } from "../value";

export const sendMailOfNotice = (body: string, recipient: string) => {
  const subject = "メールアドレス収集システムからの通知";

  const options = {
    name: PIC!,
    from: PIC_EMAIL!,
  };

  GmailApp.sendEmail(recipient, subject, body, options);
};
