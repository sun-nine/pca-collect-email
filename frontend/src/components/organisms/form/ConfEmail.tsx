import React, { Dispatch, SetStateAction } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { AiOutlineMail } from "react-icons/ai";

type Props = {
  confEmail: string;
  setConfEmail: Dispatch<SetStateAction<string>>;
  confEmailErrorMessage: string;
};

export const FormConfEmail: React.FC<Props> = ({
  confEmail,
  setConfEmail,
  confEmailErrorMessage,
}) => {
  return (
    <FormControl isInvalid={true}>
      <FormLabel htmlFor="email-confirm" color="blue.500" fontSize="sm">
        メールアドレス（確認用の再入力）
      </FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <AiOutlineMail color="gray.300" />
        </InputLeftElement>
        <Input
          id="email-confirm"
          type="email"
          placeholder="例) xxx@example.com"
          value={confEmail}
          onChange={(e) => setConfEmail(e.target.value)}
          isInvalid={confEmailErrorMessage !== ""}
          style={{ background: "rgb(245, 249, 252)" }}
        />
      </InputGroup>
      <FormErrorMessage>{confEmailErrorMessage}</FormErrorMessage>
    </FormControl>
  );
};
