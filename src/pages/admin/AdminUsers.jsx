import React from "react";
import { Box, Flex, Spacer } from "@chakra-ui/react";
import Sidebar from "../../components/AdminSidebar";
import PopularUsersPage from "../../components/PopularUsers";

function App() {
  return (
    <Flex>
      <Sidebar />
      <Box p="4">
        <PopularUsersPage />
      </Box>
    </Flex>
  );
}

export default App;