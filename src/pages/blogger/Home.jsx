import { FormControl, FormLabel, Select, Text, VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import BlogCard from "../../components/Cards/BlogCard";
import { sortData } from "../../data/sortData";

const Home = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState("Random");

  const fetchPosts = async () => {
    try {
      let response;
      if (sortBy === "Recency") {
        response = await axios.get(
          "https://localhost:7141/api/Posts/SortByRecency"
        );
      } else if (sortBy === "Random") {
        response = await axios.get(
          "https://localhost:7141/api/Posts/SortByRandom"
        );
      } else if (sortBy === "Popularity") {
        response = await axios.get(
          "https://localhost:7141/api/Posts/SortByPopularity"
        );
      }
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleSortByChange = (event) => {
    const value = event.target.value;
    setSortBy(value);
  };

  const handleBlogClick = (id) => {
    navigate(`/blog/${id}`);
  };

  useEffect(() => {
    fetchPosts();
    //eslint-disable-next-line
  }, [sortBy]);

  return (
    <Layout>
      <VStack align={"stretch"}>
        <Text variant={"heading1"}>Blogs</Text>
        <FormControl variant={"floating"}>
          <Select onChange={handleSortByChange}>
            {sortData.map((item) => (
              <option key={item.id} value={item.sortItem}>
                {item.sortItem}
              </option>
            ))}
          </Select>
          <FormLabel
            fontWeight={"normal"}
            fontSize={{
              base: "16px",
              "2xl": "18px",
            }}
          >
            Sort by
          </FormLabel>
        </FormControl>
        <VStack align={"stretch"}>
          {posts?.map((post) => (
            <BlogCard
              key={post.id}
              onClick={() => handleBlogClick(post.id)}
              title={post.title}
              body={post.body}
            />
          ))}
        </VStack>
      </VStack>
    </Layout>
  );
};

export default Home;
