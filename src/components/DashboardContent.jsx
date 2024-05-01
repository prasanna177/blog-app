// DashboardContent.jsx
import React from "react";
import { Box, Text, Flex, VStack, Heading, SimpleGrid } from "@chakra-ui/react";
import { FiArrowUpCircle, FiArrowDownCircle } from "react-icons/fi";
import { IoMdChatboxes } from "react-icons/io";
import { FaBlog } from "react-icons/fa";
import Component from "../pages/Home";

const DashboardContent = () => {
  // Sample data for the counters
  const countersData = [
    {
      label: "Blog Posts",
      value: 250,
      icon: <FaBlog color="green.500" size={36} />,
    },
    {
      label: "Upvotes",
      value: 150,
      icon: <FiArrowUpCircle color="red.500" size={36} />,
    },
    {
      label: "Downvotes",
      value: 100,
      icon: <FiArrowDownCircle color="blue.500" size={36} />,
    },
    {
      label: "Comments",
      value: 200,
      icon: <IoMdChatboxes color="yellow.500" size={36} />,
    },
  ];

  // Custom Counter Box component
  const CounterBox = ({ icon, label, value }) => {
    return (
      <Box
        p="16"
        bg="white"
        boxShadow="md"
        rounded="lg"
        border="1px solid"
        borderColor="gray.200"
      >
        <Flex align="center">
          {icon}
          <Box ml="3">
            <Text fontWeight="bold" fontSize="lg">
              {label}
            </Text>
            <Text fontSize="2xl">{value}</Text>
          </Box>
        </Flex>
      </Box>
    );
  };

  return (
    <Box flex="1" p="4">
      <Heading mb="4">Dashboard Content</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing="8">
        {countersData.map(({ label, value, icon }, index) => (
          <CounterBox key={index} icon={icon} label={label} value={value} />
        ))}
      </SimpleGrid>
      <Box flex="1" p="4">
        <Component />
      </Box>
    </Box>
  );
};

export default DashboardContent;
