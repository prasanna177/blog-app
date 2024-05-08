import {
  Box,
  Button,
  HStack,
  Text,
  VStack,
  useDisclosure,
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
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import ReactionModal from "../../components/Modals/ReactionModal";

const BlogDetails = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

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
  const [reactions, setReactions] = useState([]);

  const [totalReactions, setTotalReactions] = useState(0);
  const [likedReactions, setLikedReactions] = useState(null);
  const [dislikedReactions, setDislikedReactions] = useState(null);

  useEffect(() => {
    calculateTotalReactions();
    //eslint-disable-next-line
  }, [reactions]);

  const calculateTotalReactions = () => {
    let total = 0;

    reactions.forEach((reaction) => {
      if (reaction.isPositive) {
        total++;
      } else {
        total--;
      }
    });

    setTotalReactions(total);
  };
  console.log(totalReactions, "tot");

  useEffect(() => {
    fetchPosts();
    fetchComments();
    fetchPostReactions();

    //eslint-disable-next-line
  }, []);

  const handleReaction = async (isCommentReaction, isPositive, id) => {
    try {
      const existingReaction = reactions?.find(
        (reaction) => reaction.user === user && reaction.postId === Number(id)
      );

      if (existingReaction) {
        await handleDeleteReaction();
      }
      const response = await axios.post(
        "https://localhost:7141/api/PostReactions",
        {
          isPositive,
          user,
          postId: id,
          isCommentReaction,
          createdAt: new Date(),
        }
      );
      fetchPostReactions();
      console.log(response, "reactionRes");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const handleDeleteReaction = async () => {
    try {
      const reaction = reactions.find(
        (reaction) =>
          reaction.user === user && reaction.postId === Number(params.id)
      );
      const id = reaction?.id;
      console.log(id);
      const response = await axios.delete(
        `https://localhost:7141/api/PostReactions/${id}`
      );
      console.log(response, "reactionRes");
      if (response.status === 204) {
        setIsLiked(false);
        setIsDisliked(false);
        fetchPostReactions();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

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

  const fetchPostReactions = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7141/api/PostReactions/NonCommentReactions/${params.id}`
      );
      const likedReactions = response.data.filter(
        (reaction) =>
          reaction.isPositive === true && reaction.isCommentReaction === false
      );
      const dislikedReactions = response.data.filter(
        (reaction) =>
          reaction.isPositive === false && reaction.isCommentReaction === false
      );
      setLikedReactions(likedReactions);
      setDislikedReactions(dislikedReactions);
      setReactions(response.data);
      if (response.data.length > 0) {
        const userReaction = response.data.find(
          (reaction) => reaction.user === user
        );
        if (userReaction) {
          setIsLiked(userReaction.isPositive);
          setIsDisliked(!userReaction.isPositive);
        } else {
          setIsLiked(false);
          setIsDisliked(false);
        }
      } else {
        // Reset isLiked and isDisliked states if there are no reactions
        setIsLiked(false);
        setIsDisliked(false);
      }
    } catch (error) {
      console.log("Error in fetching post reactions", error);
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(reactions, "reactions");

  return (
    <Box>
      <ReactionModal
        isOpen={isOpen}
        onClose={onClose}
        likedReactions={likedReactions}
        dislikedReactions={dislikedReactions}
      />
      <HStack>
        {isLiked ? (
          <Box _hover={{ cursor: "pointer" }}>
            <FaThumbsUp
              color="blue"
              onClick={() => {
                console.log("removed liked");
                handleDeleteReaction();
              }}
            />
          </Box>
        ) : (
          <Box _hover={{ cursor: "pointer" }}>
            <FaRegThumbsUp
              color="blue"
              onClick={() => {
                handleReaction(false, true, params.id);
                console.log("liked");
              }}
            />
          </Box>
        )}
        {isDisliked ? (
          <Box _hover={{ cursor: "pointer" }}>
            <FaThumbsDown
              color="blue"
              onClick={() => {
                handleDeleteReaction();
                console.log("removed dislike");
              }}
            />
          </Box>
        ) : (
          <Box _hover={{ cursor: "pointer" }}>
            <FaRegThumbsDown
              color="blue"
              onClick={() => {
                handleReaction(false, false, params.id);
              }}
            />
          </Box>
        )}
        <Text _hover={{ cursor: "pointer" }} onClick={() => onOpen()}>
          {totalReactions}
        </Text>
        {/* <Tooltip tooltipId={'total-reaction'} label={'View reactions'}>
        </Tooltip> */}
      </HStack>
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
      {comments.length > 0 ? (
        <VStack alignItems={"stretch"}>
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              id={comment.id}
              content={comment.content}
              userId={comment.user}
              createdAt={comment.createdAt}
              fetchComments={fetchComments}
              handleReaction={handleReaction}
            />
          ))}
        </VStack>
      ) : (
        <Text>No comments</Text>
      )}
    </Box>
  );
};

export default BlogDetails;
