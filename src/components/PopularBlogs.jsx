import React, { useState, useEffect } from "react";
import { Box, Flex, Select, Text, VStack, Heading, Image, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const PopularBlogsPage = () => {
  const [popularBlogs, setPopularBlogs] = useState([]);
  const [popularBlogsByMonth, setPopularBlogsByMonth] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  useEffect(() => {
    fetch("https://localhost:7141/api/Posts/PopularBlogs")
      .then((response) => response.json())
      .then((data) => {
        setPopularBlogs(data);
      })
      .catch((error) => console.error("Error fetching popular blogs:", error));
  }, []);

  useEffect(() => {
    if (selectedMonth && selectedYear) {
      fetch(`https://localhost:7141/api/Posts/PopularBlogsByMonth?month=${selectedMonth}&year=${selectedYear}`)
        .then((response) => response.json())
        .then((data) => {
          setPopularBlogsByMonth(data);
        })
        .catch((error) => console.error("Error fetching popular blogs by month:", error));
    }
  }, [selectedMonth, selectedYear]);

  return (
    <Box p="4" width="100%">
      <Heading mb="4">Popular Blogs</Heading>
      <Table variant="simple" width="100%">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Popularity</Th>
            <Th>Body</Th>
            <Th>Image</Th>
          </Tr>
        </Thead>
        <Tbody>
          {popularBlogs.map((blog) => (
            <Tr key={blog.id}>
              <Td>{blog.title}</Td>
              <Td>{blog.popularity}</Td>
              <Td>{blog.body}</Td>
              <Td><Image src={blog.images} alt={blog.title} boxSize="50px" /></Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Heading mb="4" mt="8">Popular Blogs by Month</Heading>
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
          {/* Add more years as needed */}
        </Select>
      </Flex>
      <Table variant="simple" width="100%">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Popularity</Th>
            <Th>Body</Th>
            <Th>Image</Th>
          </Tr>
        </Thead>
        <Tbody>
          {popularBlogsByMonth.map((blog) => (
            <Tr key={blog.id}>
              <Td>{blog.title}</Td>
              <Td>{blog.popularity}</Td>
              <Td>{blog.body}</Td>
              <Td><Image src={blog.images} alt={blog.title} boxSize="50px" /></Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default PopularBlogsPage;
