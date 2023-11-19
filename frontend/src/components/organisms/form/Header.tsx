import React from "react";
import { Box } from "@chakra-ui/react";

export const FormHeader: React.FC = () => {
  return (
    <>
      <Box fontSize="xl" fontWeight="bold" textAlign="center">
        入力フォーム
      </Box>
      <Box mt="3" textAlign="center">
        メールアドレスを入力して送信して下さい
      </Box>
    </>
  );
};
