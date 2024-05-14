import { Box, Button, HStack } from "@chakra-ui/react";
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
            <Button
              bg={"primary.0"}
              color={"white"}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
            <Button
              bg={"primary.0"}
              color={"white"}
              onClick={() => {
                navigate("/signup");
              }}
            >
              Signup
            </Button>
          </HStack>
        )}
      </HStack>
    </Box>
  );
};

export default Navbar;
