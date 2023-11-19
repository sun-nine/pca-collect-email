import React from "react";
import { Box, Button } from "@chakra-ui/react";

type Props = {
  isLoading: boolean;
};

export const FormButton: React.FC<Props> = ({ isLoading }) => {
  return (
    <Box pt="10" display="flex" justifyContent="center">
      <Button
        type="submit"
        isLoading={isLoading}
        colorScheme="teal"
        size="md"
        px="10"
      >
        送信する
      </Button>
    </Box>
  );
};
