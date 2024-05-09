// DashboardContent.jsx
import React, { useState, useEffect } from "react";
import { Box, Text, Flex, VStack, Heading, Select , SimpleGrid } from "@chakra-ui/react";
import { FiArrowUpCircle, FiArrowDownCircle } from "react-icons/fi";
import { IoMdChatboxes } from "react-icons/io";
import { FaBlog } from "react-icons/fa";

const DashboardContent = () => {
    const [blogCount, setBlogCount] = useState(0);
    const [upvoteCount, setUpvoteCount] = useState(0);
    const [downvoteCount, setDownvoteCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [postCount, setPostCount] = useState(0);
    const [upbyMonth, setUpbyMonth] = useState(0);
    const [downbyMonth, setDownbyMonth] = useState(0);
    const [commentbyMonth, setCommentbyMonth] = useState(0);

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
      };
    
      const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
      };    useEffect(() => {
        fetch("https://localhost:7141/api/Posts/Count")
          .then((response) => response.json())
          .then((data) => {
            console.log(data, "API response"); 
            setBlogCount(data); 
          })
          .catch((error) => console.error("Error fetching blog count:", error));
      }, []);
      useEffect(() => {
        fetch("https://localhost:7141/api/PostReactions/TotalPositiveReactionCount")
          .then((response) => response.json())
          .then((data) => {
            setUpvoteCount(data); 
          })
          .catch((error) => console.error("Error fetching blog count:", error));
      }, []);
      useEffect(() => {
        fetch("https://localhost:7141/api/PostReactions/TotalNegativeReactionCount")
          .then((response) => response.json())
          .then((data) => {
            setDownvoteCount(data); 
          })
          .catch((error) => console.error("Error fetching blog count:", error));
      }, []);
      useEffect(() => {
        fetch("https://localhost:7141/api/Comments/Count")
          .then((response) => response.json())
          .then((data) => {
            setCommentCount(data); 
          })
          .catch((error) => console.error("Error fetching blog count:", error));
      }, []);

    
      useEffect(() => {
        if (selectedMonth && selectedYear) {
          fetch(`https://localhost:7141/api/Posts/CountByMonth?month=${selectedMonth}&year=${selectedYear}`)
            .then((response) => response.json())
            .then((data) => setPostCount(data))
            .catch((error) => console.error("Error fetching post count:", error));
        }
      }, [selectedMonth, selectedYear]);
      useEffect(() => {
        if (selectedMonth && selectedYear) {
          fetch(`https://localhost:7141/api/PostReactions/TotalPositivereactionCountByMonth?month=${selectedMonth}&year=${selectedYear}`)
            .then((response) => response.json())
            .then((data) => setUpbyMonth(data))
            .catch((error) => console.error("Error fetching post count:", error));
        }
      }, [selectedMonth, selectedYear]);
      useEffect(() => {
        if (selectedMonth && selectedYear) {
          fetch(`https://localhost:7141/api/PostReactions/TotalNegativereactionCountByMonth?month=${selectedMonth}&year=${selectedYear}`)
            .then((response) => response.json())
            .then((data) => setDownbyMonth(data))
            .catch((error) => console.error("Error fetching post count:", error));
        }
      }, [selectedMonth, selectedYear]);
      useEffect(() => {
        if (selectedMonth && selectedYear) {
          fetch(`https://localhost:7141/api/Comments/CountByMonth?month=${selectedMonth}&year=${selectedYear}`)
            .then((response) => response.json())
            .then((data) => setCommentbyMonth(data))
            .catch((error) => console.error("Error fetching post count:", error));
        }
      }, [selectedMonth, selectedYear]);
    const countersData = [
    {
      label: "Blog Posts",
      value: blogCount,
      icon: <FaBlog color="green.500" size={36} />,
    },
    {
      label: "Upvotes",
      value: upvoteCount,
      icon: <FiArrowUpCircle color="red.500" size={36} />,
    },
    {
      label: "Downvotes",
      value: downvoteCount,
      icon: <FiArrowDownCircle color="blue.500" size={36} />,
    },
    {
      label: "Comments",
      value: commentCount,
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
      <Flex>
          <Select value={selectedMonth} onChange={handleMonthChange} placeholder="Select Month">
          <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
            
          </Select>
          <Select value={selectedYear} onChange={handleYearChange} placeholder="Select Year">
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>

          </Select>
        </Flex>      </Box>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing="8">

        <CounterBox icon={<FaBlog color="green.500" size={36} />} label="Blog Posts" value={postCount} />
        <CounterBox icon={<FiArrowUpCircle color="green.500" size={36} />} label="Upvotes" value={upbyMonth} />
        <CounterBox icon={<FiArrowDownCircle color="green.500" size={36} />} label="Downvotes" value={downbyMonth} />
        <CounterBox icon={<IoMdChatboxes color="green.500" size={36} />} label="Comments" value={commentbyMonth} />

        </SimpleGrid>
        
    </Box>
  );
};

export default DashboardContent;