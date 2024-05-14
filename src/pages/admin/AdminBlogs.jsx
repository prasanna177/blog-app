import React from "react";
import { Box, Flex, Spacer } from "@chakra-ui/react";
import Sidebar from "../../components/AdminSidebar";
import PopularBlogsPage from "../../components/PopularBlogs";
import Layout from "../../components/Layout/Layout";

function App() {
  return (
    <Layout>
      <Flex>
        <Box p="4">
          <PopularBlogsPage />
        </Box>
      </Flex>
    </Layout>
  );
}

export default App;
