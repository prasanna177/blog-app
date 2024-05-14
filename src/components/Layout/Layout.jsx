import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../AdminSidebar";

const Layout = ({ title, children }) => {
  const decodedToken =
    localStorage.getItem("token") && jwtDecode(localStorage.getItem("token"));

  const clearLocalStorageOnError = (error) => {
    if (error.response && error.response.status === 403) {
      localStorage.removeItem("token");
    }
  };

  // Setup Axios interceptors
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        clearLocalStorageOnError(error);
        return Promise.reject(error);
      }
    );

    return () => {
      // Cleanup interceptor on component unmount
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  let currentUserRole;
  let userId;
  if (localStorage.getItem("token")) {
    userId =
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ];
    currentUserRole =
      decodedToken[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ];
  }

  return (
    <>
      <Box h={"100vh"}>
        <Flex>
          {currentUserRole !== "admin" ? <Sidebar /> : <AdminSidebar />}
          {currentUserRole !== "admin" ? (
            <Box ml={"255px"} w={"100%"} h={"100%"}>
              {currentUserRole !== "admin" ? <Navbar /> : false}
              <VStack alignItems={"stretch"} gap={4}>
                <Text variant={"heading1"}>{title}</Text>
                <Box p={5} minH={"86vh"} bgColor={"white"}>
                  {children}
                </Box>
              </VStack>
            </Box>
          ) : (
            <Box ml={"10px"} w={"100%"} h={"100%"}>
              <Navbar />
              <VStack alignItems={"stretch"} gap={4}>
                <Text variant={"heading1"}>{title}</Text>
                <Box p={5} minH={"86vh"} bgColor={"white"}>
                  {children}
                </Box>
              </VStack>
            </Box>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default Layout;
