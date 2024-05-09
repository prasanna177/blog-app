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
//   useEffect(() => {
//     const fetchNotifications = async () => {
//           try {
//             const response = await axios.get(
//               `https://localhost:7141/api/Users/Notifications/${user?.id}`
//             );
//             setNotifications(response.data);
//           } catch (error) {
//             console.error(error);
//           }
//         };
    
//         // Fetch old notifications when the component mounts
//         fetchNotifications();
//     // Start SignalR connection and subscribe to notifications
//     SignalRService.startConnection();
//     SignalRService.subscribeToNotifications(handleNotification);

//     return () => {
//       // Clean up subscription when component unmounts
//       SignalRService.connection.off("ReceiveNotification", handleNotification);
//     };
//   }, []);


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
import * as signalR from "@microsoft/signalr";

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
import SignalRService from "./SignalRService";

const Notifications = () => {
  const { user } = useSelector((state) => state.user);
  const [notifications, setNotifications] = useState([]);
const[currentNot, setCurrentNot] = useState("");
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7141/api/Users/Notifications/${user?.id}`
        );
        setNotifications(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch old notifications when the component mounts
    fetchNotifications();

    // Start SignalR connection and subscribe to notifications
    SignalRService.startConnection();
    SignalRService.subscribeToNotifications(handleNotification);

    return () => {
      // Clean up subscription when component unmounts
      SignalRService.connection.off("ReceiveNotification", handleNotification);
    };
  }, [user]);
  const handleNotification = (notification) => {
    setCurrentNot(notification)
    console.log(notification,"signalNot")
   setNotifications((prevNotifications) => [...prevNotifications, notification]);
  };

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
            {notifications.length !== 0 &&
              (notifications.length <= 9 ? notifications.length : "9+")}
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
        <NotificationList notification={notifications} otherone={currentNot} />
        {/* <NotificationList2 notification={currentNot} /> */}

      </MenuList>
    </Menu>
  );
};

export default Notifications;