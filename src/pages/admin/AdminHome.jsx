import React from "react";
import { Box, Flex, Spacer } from "@chakra-ui/react";
import Sidebar from "../../components/AdminSidebar";
import DashboardContent from "../../components/DashboardContent";

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