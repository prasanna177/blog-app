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
  VStack,
  MenuItem,
  Divider,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import NotificationList from "./NotificationList";
import toast from "react-hot-toast";
import SignalRService from "./SignalRService";
import { useNavigate } from "react-router-dom";
import { getDateAndTime } from "../utils";

const Notifications = () => {
  const { user } = useSelector((state) => state.user);
  const [isUnseen, setIsUnseen] = useState(true);
  const [unseenNotifications, setUnseenNotifications] = useState([]);
  const [seenNotifications, setSeenNotifications] = useState([]);
  const [signalNot, setSignalNot] = useState("");
  const navigate = useNavigate();

  const handleNotificationClick = (item) => {
    navigate(item.onClickPath && item.onClickPath);
  };
  // const fetchNotificaitons = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://localhost:7141/api/Users/Notifications/${user?.id}`
  //     );
  //     const unseenNotifications = response.data.filter(
  //       (notification) => notification.isRead === false
  //     );
  //     setUnseenNotifications(unseenNotifications);

  //     const seenNotifications = response.data.filter(
  //       (notification) => notification.isRead === true
  //     );
  //     setSeenNotifications(seenNotifications);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
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
  useEffect(() => {
    // Fetch old notifications when the component mounts
    fetchNotificaitons();
    // Start SignalR connection and subscribe to notifications
    SignalRService.startConnection();
    SignalRService.subscribeToNotifications(handleNotification);

    return () => {
      // Clean up subscription when component unmounts
      SignalRService.connection.off("ReceiveNotification", handleNotification);
    };
  }, []);
  const handleNotification = (notification) => {
    setSignalNot(notification);
    console.log(notification, "signalNot");
    toast.info(notification?.content);
    //  setUnseenNotifications((prevNotifications) => [...prevNotifications, notification]);
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
        const updatedSeenNotifications = seenNotifications.filter(
          (notification) => !notification.isRead
        );
        setSeenNotifications(updatedSeenNotifications);
      } else {
        toast.error("Failed to delete notificaiton");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   fetchNotificaitons();
  //   //eslint-disable-next-line
  // }, []);

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
              {/* <NotificationList notification={unseenNotifications} />
              <NotificationList signalNot={signalNot} /> */}
              {!unseenNotifications?.length && "No new notifications"}
              {unseenNotifications?.map((item, index) => {
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
                    {signalNot && (
                      <MenuItem
                        onClick={() => handleNotificationClick(item)}
                        _hover={{ bgColor: "gray.0" }}
                      >
                        <VStack alignItems={"start"}>
                          <Box fontSize={"md"} fontWeight={"bold"}>
                            {signalNot?.content}
                          </Box>
                          <HStack fontSize={"sm"} color={"gray.100"}>
                            <i className="fa-regular fa-clock"></i>
                            {/* <Text>
                    {item.createdAt && getDateAndTime(item.createdAt)}
                  </Text> */}
                          </HStack>
                        </VStack>
                      </MenuItem>
                    )}
                    <Divider borderWidth={"1px"} />
                  </Box>
                );
              })}
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
// import { BellIcon } from "@chakra-ui/icons";
// import {
//   Box,
//   Flex,
//   HStack,
//   Menu,
//   MenuButton,
//   MenuList,
//   Text,
// } from "@chakra-ui/react";
// import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import NotificationList from "./NotificationList";
// import SignalRService from "./SignalRService";

// const Notifications = () => {
//   const { user } = useSelector((state) => state.user);
//   const [notifications, setNotifications] = useState(null);

//   // const fetchNotificaitons = async () => {
//   //   try {
//   //     const response = await axios.get(
//   //       `https://localhost:7141/api/Users/Notifications/${user?.id}`
//   //     );
//   //     setNotifications(response.data);
//   //     console.log(response, "resp");
//   //   } catch (error) {
//   //     console.error(error);
//   //   }
//   // };

//   // useEffect(() => {
//   //   fetchNotificaitons();
//   // }, []);
//   // useEffect(() => {
//   //   // Function to fetch old notifications
//   //   const fetchNotifications = async () => {
//   //     try {
//   //       const response = await axios.get(
//   //         `https://localhost:7141/api/Users/Notifications/${user?.id}`
//   //       );
//   //       setNotifications(response.data);
//   //     } catch (error) {
//   //       console.error(error);
//   //     }
//   //   };

//   //   // Fetch old notifications when the component mounts
//   //   fetchNotifications();

//   //   // Start the SignalR connection
//   //   SignalRService.startConnection();

//   //   // Subscribe to incoming notifications
//   //   const handleNotification = (notification) => {
//   //     setNotifications((prevNotifications) => [...prevNotifications, notification]);
//   //   };
//   //   SignalRService.subscribeToNotifications(handleNotification);

//   //   // Clean up function
//   //   return () => {
//   //     SignalRService.connection.off("ReceiveNotification", handleNotification);
//   //   };
//   // }, [user]);
// useEffect(() => {
//   const fetchNotifications = async () => {
//         try {
//           const response = await axios.get(
//             `https://localhost:7141/api/Users/Notifications/${user?.id}`
//           );
//           setNotifications(response.data);
//         } catch (error) {
//           console.error(error);
//         }
//       };

//       // Fetch old notifications when the component mounts
//       fetchNotifications();
//   // Start SignalR connection and subscribe to notifications
//   SignalRService.startConnection();
//   SignalRService.subscribeToNotifications(handleNotification);

//   return () => {
//     // Clean up subscription when component unmounts
//     SignalRService.connection.off("ReceiveNotification", handleNotification);
//   };
// }, []);

//   const handleNotification = (notification) => {
//     setNotifications((prevNotifications) => {
//       // Ensure that prevNotifications is always an array
//       const updatedNotifications = Array.isArray(prevNotifications) ? [...prevNotifications, notification] : [notification];
//       return updatedNotifications;
//     });
//   };

//   return (
//     <Menu>
//       <MenuButton>
//         <Flex pos={"relative"}>
//           <BellIcon boxSize={10} color={"black"} />
//           <Box
//             bgColor={"red"}
//             color={"white"}
//             pos={"absolute"}
//             top={"-2px"}
//             right={"-1px"}
//             paddingX={"5px"}
//             borderRadius={"14px"}
//             fontSize={"12px"}
//           >
//             {notifications != 0 &&
//               (notifications?.length <= 9 ? notifications.length : "9+")}
//           </Box>
//         </Flex>
//       </MenuButton>
//       <MenuList
//         zIndex={100}
//         h={"500px"}
//         w={"400px"}
//         overflowY={"auto"}
//         style={{
//           scrollbarWidth: "thin",
//           scrollbarColor: "gray.200 white",
//         }}
//       >
//         <HStack p={"20px"} justifyContent={"space-between"}>
//           <Text fontSize={"3xl"}>Notifications</Text>
//         </HStack>
//         <NotificationList notification={notifications} />
//       </MenuList>
//     </Menu>
//   );
// };

// export default Notifications;
// import * as signalR from "@microsoft/signalr";

// import { BellIcon } from "@chakra-ui/icons";
// import {
//   Box,
//   Flex,
//   HStack,
//   Menu,
//   MenuButton,
//   MenuList,
//   Text,
// } from "@chakra-ui/react";
// import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import NotificationList from "./NotificationList";
// import SignalRService from "./SignalRService";
// import toast from "react-hot-toast";

// const Notifications = () => {
//   const { user } = useSelector((state) => state.user);
//   const [notifications, setNotifications] = useState([]);
// const[currentNot, setCurrentNot] = useState("");
//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const response = await axios.get(
//           `https://localhost:7141/api/Users/Notifications/${user?.id}`
//         );
//         setNotifications(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     // Fetch old notifications when the component mounts
//     fetchNotifications();

//     // Start SignalR connection and subscribe to notifications
//     SignalRService.startConnection();
//     SignalRService.subscribeToNotifications(handleNotification);

//     return () => {
//       // Clean up subscription when component unmounts
//       SignalRService.connection.off("ReceiveNotification", handleNotification);
//     };
//   }, [user]);
//   const handleNotification = (notification) => {
//     setCurrentNot(notification)
//     console.log(notification,"signalNot")
// toast.message(notification?.content)
//    setNotifications((prevNotifications) => [...prevNotifications, notification]);
//   };

//   return (
//     <Menu>
//       <MenuButton>
//         <Flex pos={"relative"}>
//           <BellIcon boxSize={10} color={"black"} />
//           <Box
//             bgColor={"red"}
//             color={"white"}
//             pos={"absolute"}
//             top={"-2px"}
//             right={"-1px"}
//             paddingX={"5px"}
//             borderRadius={"14px"}
//             fontSize={"12px"}
//           >
//             {notifications.length !== 0 &&
//               (notifications.length <= 9 ? notifications.length : "9+")}
//           </Box>
//         </Flex>
//       </MenuButton>
//       <MenuList
//         zIndex={100}
//         h={"500px"}
//         w={"400px"}
//         overflowY={"auto"}
//         style={{
//           scrollbarWidth: "thin",
//           scrollbarColor: "gray.200 white",
//         }}
//       >
//         <HStack p={"20px"} justifyContent={"space-between"}>
//           <Text fontSize={"3xl"}>Notifications</Text>
//         </HStack>
//         <NotificationList notification={notifications} otherone={currentNot} />
//         {/* <NotificationList2 notification={currentNot} /> */}

//       </MenuList>
//     </Menu>
//   );
// };

// export default Notifications;
