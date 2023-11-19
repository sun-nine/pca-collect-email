import { Box, Divider } from "@chakra-ui/react";
import { Head } from "@/components/Head";
import { TopLayout } from "@/components/templates/Top";

export default function Thanks() {
  return (
    <>
      <Head />
      <TopLayout>
        <Box textAlign="center" fontWeight="bold" fontSize="3xl">
          <Box
            display="inline"
            pb="5"
            borderBottom="1px"
            borderColor="teal.400"
          >
            送信完了しました
          </Box>
        </Box>
        <Box mt="16" textAlign="center">
          メールは送信されました。ありがとうございます。
          <br />
          入力頂いたメールアドレス宛に確認のメールをお送りさせて頂きましたのでご確認下さい。
        </Box>
      </TopLayout>
    </>
  );
}
