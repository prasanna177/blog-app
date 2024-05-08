import { Box, Divider, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import logo from "../../assets/images/logo.png";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const AdminMenu = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: "fa-solid fa-gauge",
    },

    {
      name: "User",
      path: "/admin/create-user",
      icon: "fa-regular fa-user",
    },
  ];

  const BloggerMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Profile",
      path: `/profile/${user.userId}`,
      icon: "fa-solid fa-user",
    },
    {
      name: "Create blog",
      path: `/create-blog`,
      icon: "fa-solid fa-pen-nib",
    },
  ];
  const SideBarMenu =
    user?.role === "admin"
      ? AdminMenu
      : user?.role === "user"
      ? BloggerMenu
      : false;

  return (
    <Box
      zIndex={12}
      p={4}
      pos={"fixed"}
      minH={"100%"}
      w={"250px"}
      mr={"20px"}
      bgColor={"white"}
    >
      <VStack>
        <Box maxW={"200px"}>
          <Image src={logo} w={"200px"} />
        </Box>
        <Divider />
        <Box w={"100%"} color={"gray.700"} fontSize={"lg"}>
          {SideBarMenu.map((menu, index) => {
            const isActive = location.pathname === menu.path;
            return (
              <Link key={index} to={menu.path}>
                <HStack
                  bg={isActive ? "primary.0" : "white"}
                  color={isActive ? "white" : "gray.700"}
                  p={"10px"}
                  _hover={{ bgColor: "primary.100", color: "primary.0" }}
                  borderRadius={"5px"}
                >
                  <i className={menu.icon}></i>
                  <Text>{menu.name}</Text>
                </HStack>
              </Link>
            );
          })}
        </Box>
      </VStack>
    </Box>
  );
};

export default Sidebar;
