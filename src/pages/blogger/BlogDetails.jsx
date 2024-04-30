import { useEffect, useState } from 'react'

const BlogDetails = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [reactions, setReactions] = useState([]);

  useEffect(() => {
    fetchPosts();
    fetchComments();
    fetchReactions();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://localhost:7141/api/Posts");
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    }
    setLoading(false);
  };
  return (
    <div>
      
    </div>
  )
}

export default BlogDetails
