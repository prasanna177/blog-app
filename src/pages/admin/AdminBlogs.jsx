import React from "react";
import { Box, Flex, Spacer } from "@chakra-ui/react";
import Sidebar from "../../components/AdminSidebar";
import PopularBlogsPage from "../../components/PopularBlogs";

function App() {
  return (
    <Flex>
      <Sidebar />
      <Box p="4">
        <PopularBlogsPage />
      </Box>
    </Flex>
  );
}

export default App;