import { Box, HStack, Text } from "@chakra-ui/react";
import Notifications from "../Notifications";
import ProfilePopup from "../ProfilePopup";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Box py={3} pr={3} borderBottom={"gray.200"} mb={"20px"} bgColor={"white"}>
      <HStack justifyContent={"flex-end"}>
        {localStorage.getItem("token") ? (
          <HStack>
            <Notifications />
            <ProfilePopup />
          </HStack>
        ) : (
          <HStack>
            <Text
              _hover={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Text>
            <Text
              _hover={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign up
            </Text>
          </HStack>
        )}
      </HStack>
    </Box>
  );
};

export default Navbar;
