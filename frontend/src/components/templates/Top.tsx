import React from "react";
import { Box, Container } from "@chakra-ui/react";
import { Header } from "../organisms/layout/Header";

type Props = {
  children: React.ReactNode;
};

export const TopLayout: React.FC<Props> = ({ children }) => {
  return (
    <Box as="main" minH="100vh">
      <Header />
      <Container maxW="2xl">
        <Box p="3rem 0 7rem">{children}</Box>
      </Container>
    </Box>
  );
};
