import {
  Box,
  Button,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageComponent from "../../components/ImageComponent";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import TextareaField from "../../components/TextareaField";
import { getDateAndTime } from "../../utils";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import CommentCard from "../../components/Cards/CommentCard";

const BlogDetails = () => {
  const params = useParams();
  const navigate = useNavigate();

  

  const { user } = useSelector((state) => state.user);

  const schema = yup.object({
    content: yup.string().required("Enter your comment"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  // const [reactions, setReactions] = useState([]);

  useEffect(() => {
    fetchPosts();
    fetchComments();
  }, []);

  const handleComment = async (data) => {
    try {
      if (!localStorage.getItem("token")) {
        return navigate("/login");
      }
      const submissionData = {
        ...data,
        user,
        createdAt: new Date(),
        postId: params.id,
      };
      const response = await axios.post(
        "https://localhost:7141/api/Comments",
        submissionData
      );
      console.log(response, "resComPost");
      if (response.status === 201) {
        fetchComments();
        toast.success("Comment added");
      } else {
        toast.error("Failed to add comment.");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7141/api/Posts/${params.id}`
      );
      if (response.status === 200) {
        setPosts(response.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7141/api/Comments/ByPostId/${params.id}`
      );
      setComments(response.data);
    } catch (error) {
      console.log("Error in fetching comments", error);
    }
  };

  console.log(comments);
  return (
    <Box>
      
      <Text>{posts.title}</Text>
      <Text>{getDateAndTime(posts.createdAt)}</Text>
      <ImageComponent width={"400px"} src={posts.images} />
      <Text>{posts.body}</Text>

      <form onSubmit={handleSubmit(handleComment)}>
        <TextareaField
          name={"content"}
          placeholder={"Comment"}
          register={register}
          errors={errors?.content?.message}
        />
        <Button type="submit">Comment</Button>
      </form>

      <Text>Comments</Text>
      <VStack alignItems={"stretch"}>
        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            id={comment.id}
            content={comment.content}
            userId={comment.user}
            createdAt={comment.createdAt}
            fetchComments={fetchComments}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default BlogDetails;
