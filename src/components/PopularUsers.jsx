import React, { useState, useEffect } from "react";
import { Box, Text, Flex, VStack, Heading, Image, Select, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const PopularUsersPage = () => {
  const [mostPopularUser, setMostPopularUser] = useState(null);
  const [mostPopularUsersByMonth, setMostPopularUsersByMonth] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  useEffect(() => {
    fetch("https://localhost:7141/api/Users/MostPopularUser")
      .then((response) => response.json())
      .then((data) => setMostPopularUser(data))
      .catch((error) => console.error("Error fetching most popular user:", error));

    if (selectedMonth && selectedYear) {
      fetch(`https://localhost:7141/api/Users/MostPopularUsersByMonth/${selectedYear}/${selectedMonth}`)
        .then((response) => response.json())
        .then((data) => setMostPopularUsersByMonth(data))
        .catch((error) => console.error("Error fetching most popular users by month:", error));
    }
  }, [selectedMonth, selectedYear]);

  return (
    <Box p="4" width="160%">
      <Heading mb="4">Popular Users</Heading>
      {mostPopularUser && (
        <Box mb="8">
          <Heading as="h2" size="md" mb="2">Most Popular User Overall</Heading>
          <Table variant="simple" width="100%">
            <Thead>
              <Tr>
                <Th>User ID</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Popularity Score</Th>
                <Th>Profile Picture</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{mostPopularUser.id}</Td>
                <Td>{mostPopularUser.name}</Td>
                <Td>{mostPopularUser.email}</Td>
                <Td>{mostPopularUser.popularityScore}</Td>
                <Td><Image src={mostPopularUser.profilePic} boxSize="50px" /></Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      )}
      <Flex mb="4">
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
      </Flex>
 
      <Box>
        <Heading as="h2" size="md" mb="2">Most Popular Users</Heading>
        <Table variant="simple" width="100%">
          <Thead>
            <Tr>
              <Th>User ID</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Popularity Score</Th>
              <Th>Profile Picture</Th>
            </Tr>
          </Thead>
          <Tbody>
            {mostPopularUsersByMonth.map((user) => (
              <Tr key={user.userId}>
                <Td>{user.userId}</Td>
                <Td>{user.userName}</Td>
                <Td>{user.email}</Td>
                <Td>{user.popularityScore}</Td>
                <Td><Image src={user.profilePic} boxSize="50px" /></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default PopularUsersPage;
