// Sidebar.js
import React from "react";
import {
  Box,
  Text,
  VStack,
  Image,
  Link,
  Flex,
  Spacer,
  Icon,
} from "@chakra-ui/react";
import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import { BiHomeAlt, BiBarChartAlt2, BiClipboard, BiCog } from "react-icons/bi";
import logo from "../assets/react.svg";

const Sidebar = () => {
  return (
    <Box w="250px" bg="gray.900" color="white" p="4" minHeight={"100vh"}>
      <VStack align="stretch" spacing="50">
        <Flex align="center">
          <Image src={logo} alt="Company Logo" w="50px" />
          <Text fontWeight="bold" fontSize="xl" ml="2">
            Admin Dashboard
          </Text>
        </Flex>
        <VStack spacing="8" align="stretch">
          <Link href="#" _hover={{ textDecoration: "none" }}>
            <Flex align="center">
              <Icon as={BiHomeAlt} boxSize={6} />
              <Text ml="2" fontSize="lg">
                Dashboard
              </Text>
            </Flex>
          </Link>
          <Link href="#" _hover={{ textDecoration: "none" }}>
            <Flex align="center">
              <Icon as={BiBarChartAlt2} boxSize={6} />
              <Text ml="2" fontSize="lg">
                Blogs
              </Text>
            </Flex>
          </Link>
          <Link href="#" _hover={{ textDecoration: "none" }}>
            <Flex align="center">
              <Icon as={BiClipboard} boxSize={6} />
              <Text ml="2" fontSize="lg">
                Users
              </Text>
            </Flex>
          </Link>
          <Link href="#" _hover={{ textDecoration: "none" }}>
            <Flex align="center">
              <Icon as={BiCog} boxSize={6} />
              <Text ml="2" fontSize="lg">
                Create Admin
              </Text>
            </Flex>
          </Link>
        </VStack>
        <Spacer />
        <Flex
          spacing="8"
          direction="column"
          align="flex-start"
          marginTop={"50px"}
        >
          <Link href="#" _hover={{ textDecoration: "none" }}>
            <Flex align="center" mt="4">
              <Icon as={AiOutlineUser} boxSize={6} />
              <Text ml="2" fontSize="lg">
                Admin Name
              </Text>
            </Flex>
          </Link>
          <Link href="#" _hover={{ textDecoration: "none" }}>
            <Flex align="center" mt="2">
              <Icon as={AiOutlineLogout} boxSize={6} />
              <Text ml="2" fontSize="lg">
                Logout
              </Text>
            </Flex>
          </Link>
        </Flex>
      </VStack>
    </Box>
  );
};

export default Sidebar;
