import { BellIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import NotificationList from "./NotificationList";

const Notifications = () => {
  const { user } = useSelector((state) => state.user);
  const [notifications, setNotifications] = useState(null);

  const fetchNotificaitons = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7141/api/Users/Notifications/${user?.id}`
      );
      setNotifications(response.data);
      console.log(response, "resp");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotificaitons();
  }, []);

  return (
    <Menu>
      <MenuButton>
        <Flex pos={"relative"}>
          <BellIcon boxSize={10} color={"black"} />
          <Box
            bgColor={"red"}
            color={"white"}
            pos={"absolute"}
            top={"-2px"}
            right={"-1px"}
            paddingX={"5px"}
            borderRadius={"14px"}
            fontSize={"12px"}
          >
            {notifications != 0 &&
              (notifications?.length <= 9 ? notifications.length : "9+")}
          </Box>
        </Flex>
      </MenuButton>
      <MenuList
        zIndex={100}
        h={"500px"}
        w={"400px"}
        overflowY={"auto"}
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "gray.200 white",
        }}
      >
        <HStack p={"20px"} justifyContent={"space-between"}>
          <Text fontSize={"3xl"}>Notifications</Text>
        </HStack>
        <NotificationList notification={notifications} />
      </MenuList>
    </Menu>
  );
};

export default Notifications;
