import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ title, children }) => {
  return (
    <>
      <Box h={"100vh"}>
        <Flex>
          <Sidebar />
          <Box ml={"255px"} w={"100%"} h={"100%"}>
            <Navbar />
            <VStack alignItems={"stretch"} gap={4}>
              <Text variant={"heading1"}>{title}</Text>
              <Box p={5} minH={"86vh"} bgColor={"white"}>
                {children}
              </Box>
            </VStack>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Layout;
