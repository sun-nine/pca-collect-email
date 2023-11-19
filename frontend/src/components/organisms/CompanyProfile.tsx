import React from "react";
import { Box } from "@chakra-ui/react";

type Props = {
  clientName1: string | string[] | undefined;
  clientName2: string | string[] | undefined;
  companyAbbreviation: string | string[] | undefined;
};

export const CompanyProfile: React.FC<Props> = ({
  clientName1,
  clientName2,
  companyAbbreviation,
}) => {
  return (
    <Box fontWeight="bold" fontSize="xl" textAlign="center" color="gray.800">
      {clientName1} {clientName2} {companyAbbreviation}
    </Box>
  );
};
