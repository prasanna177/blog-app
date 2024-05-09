import { Box, Divider, HStack, MenuItem, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getDateAndTime } from "../utils";

const NotificationList = ({ notification, otherone }) => {
  const navigate = useNavigate();

  const handleNotificationClick = (item) => {
    navigate(item.onClickPath && item.onClickPath);
  };

  return (
    <>
      {!notification?.length && "No new notifications"}
      {notification?.map((item, index) => (
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
                <Text>{item.date && getDateAndTime(item.date)}</Text>
              </HStack>
            </VStack>
          </MenuItem>
          <Divider borderWidth={"1px"} />
        </Box>
      ))}
      {/* <Box fontSize={"md"} fontWeight={"bold"}>
                {otherone}
              </Box> */}
    </>
  );
};

export default NotificationList;
