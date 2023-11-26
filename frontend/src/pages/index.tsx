import { useRouter } from "next/router";
import { Box, useToast } from "@chakra-ui/react";
import useForm from "@/hooks/useForm";
import { Head } from "@/components/Head";
import { TopLayout } from "@/components/templates/Top";
import { CompanyProfile } from "@/components/organisms/CompanyProfile";
import { FormHeader } from "@/components/organisms/form/Header";
import { FormEmail } from "@/components/organisms/form/Email";
import { FormConfEmail } from "@/components/organisms/form/ConfEmail";
import { FormButton } from "@/components/organisms/form/Button";

export default function Home() {
  const {
    email,
    setEmail,
    confEmail,
    setConfEmail,
    emailErrorMessage,
    confEmailErrorMessage,
    isLoading,
    setIsLoading,
    isValidForm,
  } = useForm();
  const router = useRouter();
  const {
    clientId,
    clientName1,
    clientName2,
    companyAbbreviation,
    fileId,
    fileName,
  } = router.query;
  const toast = useToast();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!isValidForm()) return;

    setIsLoading(true);

    const postData = {
      clientId,
      clientName1,
      clientName2,
      companyAbbreviation,
      fileId,
      fileName,
      email,
    };

    // https://teratail.com/questions/qodwcsntzavs5n
    const postparam = {
      method: "POST",
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      body: JSON.stringify(postData),
    };

    fetch(process.env.NEXT_PUBLIC_FORM_BASE_URL!, postparam as any)
      .then((response) => {
        console.log("response", response);
        if (response.ok) {
          return response.json();
        } else {
          toast({
            title: "リクエスト中にエラーが発生しました。",
            description: "",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          setIsLoading(false);
          throw new Error("リクエスト中にエラーが発生しました。");
        }
      })
      .then((data) => {
        console.log("data", data);
        if (data.status) {
          router.push("/thanks");
        } else {
          toast({
            title: "無効なリクエストです。",
            description: data.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          setIsLoading(false);
          throw new Error(data.message);
        }
      })
      .catch((error) => {
        console.log("Fetch error:", error);
      });
  };

  return (
    <>
      <Head />
      <TopLayout>
        <CompanyProfile
          clientName1={clientName1}
          clientName2={clientName2}
          companyAbbreviation={companyAbbreviation}
        />
        <Box mt="16">
          <FormHeader />
          <Box mt="5">
            <form onSubmit={handleSubmit}>
              <FormEmail
                email={email}
                setEmail={setEmail}
                emailErrorMessage={emailErrorMessage}
              />
              <Box mt="5"></Box>
              <FormConfEmail
                confEmail={confEmail}
                setConfEmail={setConfEmail}
                confEmailErrorMessage={confEmailErrorMessage}
              />
              <FormButton isLoading={isLoading} />
            </form>
          </Box>
        </Box>
      </TopLayout>
    </>
  );
}
