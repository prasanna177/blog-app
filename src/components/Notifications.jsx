import { BellIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import NotificationList from "./NotificationList";
import toast from "react-hot-toast";

const Notifications = () => {
  const { user } = useSelector((state) => state.user);
  const [isUnseen, setIsUnseen] = useState(true);
  const [unseenNotifications, setUnseenNotifications] = useState([]);
  const [seenNotifications, setSeenNotifications] = useState([]);

  const fetchNotificaitons = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7141/api/Users/Notifications/${user?.id}`
      );
      const unseenNotifications = response.data.filter(
        (notification) => notification.isRead === false
      );
      setUnseenNotifications(unseenNotifications);

      const seenNotifications = response.data.filter(
        (notification) => notification.isRead === true
      );
      setSeenNotifications(seenNotifications);
    } catch (error) {
      console.error(error);
    }
  };

  const markAllAsSeen = async () => {
    try {
      const response = await axios.put(
        `https://localhost:7141/api/Users/Notifications/${user?.id}/MarkAllAsSeen`
      );
      if (response.status === 200) {
        toast.success("All notifications marked as read");
        fetchNotificaitons();
      } else {
        toast.error("Failed to delete notificaiton.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteAll = async () => {
    try {
      const response = await axios.delete(
        `https://localhost:7141/api/Users/seenNotifications/${user?.id}`
      );
      if (response.status === 200) {
        toast.success("Seen notifications deleted successfully");
        fetchNotificaitons();
      } else {
        toast.error("Failed to delete notificaiton");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotificaitons();
    //eslint-disable-next-line
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
            {unseenNotifications != 0 &&
              (unseenNotifications?.length <= 9
                ? unseenNotifications.length
                : "9+")}
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
          {isUnseen ? (
            <Text
              cursor={"pointer"}
              _hover={{ textDecoration: "underline" }}
              fontSize={"md"}
              color={"primary.0"}
              onClick={() => markAllAsSeen()}
            >
              Mark as read
            </Text>
          ) : (
            <Text
              cursor={"pointer"}
              _hover={{ textDecoration: "underline" }}
              fontSize={"md"}
              color={"primary.0"}
              onClick={() => deleteAll()}
            >
              Delete seen notifications
            </Text>
          )}
        </HStack>
        <Tabs colorScheme={"purple"}>
          <TabList>
            <Tab onClick={() => setIsUnseen(true)}>
              Unseen ({unseenNotifications?.length || 0})
            </Tab>
            <Tab onClick={() => setIsUnseen(false)}>
              Seen ({seenNotifications?.length || 0})
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <NotificationList notification={unseenNotifications} />
            </TabPanel>
            <TabPanel>
              <NotificationList notification={seenNotifications} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </MenuList>
    </Menu>
  );
};

export default Notifications;
