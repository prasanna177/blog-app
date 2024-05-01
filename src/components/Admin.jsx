import React from "react";
import { Box, Flex, Spacer } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import DashboardContent from "./DashboardContent";

function App() {
  return (
    <Flex>
      <Sidebar />
      <Box p="4">
        <DashboardContent />
      </Box>
    </Flex>
  );
}

export default App;
