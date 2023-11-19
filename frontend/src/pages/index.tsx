import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";
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

    const postparam = {
      method: "POST",
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      body: JSON.stringify(postData),
    };

    fetch(process.env.NEXT_PUBLIC_FORM_BASE_URL!, postparam as any)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((data) => {
        console.log(data);
        router.push("/thanks");
      })
      .catch((error) => {
        console.error("Fetch error:", error);
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
