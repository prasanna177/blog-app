import { Box, Divider, HStack, MenuItem, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getDateAndTime } from "../utils";

const NotificationList = ({ notification, signalNot }) => {
  const navigate = useNavigate();

  const handleNotificationClick = (item) => {
    navigate(item.onClickPath && item.onClickPath);
  };

  return (
    <>
      {!notification?.length && "No new notifications"}
      {notification?.map((item, index) => {
        return (
          <Box key={index}>
            <MenuItem
              onClick={() => handleNotificationClick(item)}
              _hover={{ bgColor: "gray.0" }}
            >
              <VStack alignItems={"start"}>
                <Box fontSize={"md"} fontWeight={"bold"}>
                  {item.content}
                </Box>
                <HStack fontSize={"sm"} color={"gray.100"}>
                  <i className="fa-regular fa-clock"></i>
                  <Text>
                    {item.createdAt && getDateAndTime(item.createdAt)}
                  </Text>
                </HStack>
              </VStack>
            </MenuItem>
         {signalNot &&   <MenuItem
              onClick={() => handleNotificationClick(item)}
              _hover={{ bgColor: "gray.0" }}
            >
              <VStack alignItems={"start"}>
                <Box fontSize={"md"} fontWeight={"bold"}>
                  {signalNot}
                </Box>
                <HStack fontSize={"sm"} color={"gray.100"}>
                  <i className="fa-regular fa-clock"></i>
                  {/* <Text>
                    {item.createdAt && getDateAndTime(item.createdAt)}
                  </Text> */}
                </HStack>
              </VStack>
            </MenuItem>
      }
            <Divider borderWidth={"1px"} />
          </Box>
        );
      })}

    </>
  );
};

export default NotificationList;
