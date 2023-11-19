import { useState } from "react";
import { isValidEmail } from "@/lib/isValidEmail";
import { isWithinMaxLength } from "@/lib/isWithinMaxLength";

const useForm = () => {
  const [email, setEmail] = useState("");
  const [confEmail, setConfEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [confEmailErrorMessage, setConfEmailErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isValidForm = () => {
    if (email !== confEmail) {
      setConfEmailErrorMessage("メールアドレスが一致しません");
      return false;
    }

    if (!isValidEmail(email)) {
      setConfEmailErrorMessage("");
      setEmailErrorMessage("無効なメールアドレスです");
      return false;
    }

    if (!isWithinMaxLength(email, 40)) {
      setEmailErrorMessage("");
      setEmailErrorMessage("メールアドレスは40文字以内です");
      return false;
    }

    setEmailErrorMessage("");

    return true;
  };

  return {
    email,
    setEmail,
    confEmail,
    setConfEmail,
    emailErrorMessage,
    setEmailErrorMessage,
    confEmailErrorMessage,
    setConfEmailErrorMessage,
    isLoading,
    setIsLoading,
    isValidForm,
  };
};

export default useForm;
