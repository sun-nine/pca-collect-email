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
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  emailErrorMessage: string;
};

export const FormEmail: React.FC<Props> = ({
  email,
  setEmail,
  emailErrorMessage,
}) => {
  return (
    <FormControl isInvalid={true}>
      <FormLabel htmlFor="email" color="blue.500" fontSize="sm">
        メールアドレス
      </FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <AiOutlineMail color="gray.300" />
        </InputLeftElement>
        <Input
          id="email"
          type="email"
          placeholder="例) xxx@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          isInvalid={emailErrorMessage !== ""}
          style={{ background: "rgb(245, 249, 252)" }}
        />
      </InputGroup>
      <FormErrorMessage>{emailErrorMessage}</FormErrorMessage>
    </FormControl>
  );
};
