import {
  Box,
  Button,
  HStack,
  Text,
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  // Avatar,
} from "@chakra-ui/react";

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageComponent from "../../components/ImageComponent";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import TextareaField from "../../components/TextareaField";
import BlogCard from "../../components/Cards/BlogCard";
import { getDate, getDateAndTime } from "../../utils";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import CommentCard from "../../components/Cards/CommentCard";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import ReactionModal from "../../components/Modals/ReactionModal";
import Layout from "../../components/Layout/Layout";

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
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [reactions, setReactions] = useState([]);

  const [totalReactions, setTotalReactions] = useState(0);
  const [likedReactions, setLikedReactions] = useState(null);
  const [dislikedReactions, setDislikedReactions] = useState(null);
  const [userBlogs, setUserBlogs] = useState([]);
  const [profileUser, setProfileUser] = useState(null);
  // console.log(profileUser, "pp");
  const handleBlogClick = (id) => {
    navigate(`/blog/${id}`);
    fetchPosts();
    fetchComments();
    fetchPostReactions();
  };

  // console.log(userBlogs, "ujs");
  // const getUser = async () => {
  //   try {
  //     const res = await axios.get(
  //       `https://localhost:7141/api/Users/${posts?.author}`
  //     );
  //     setProfileUser(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  console.log(profileUser, "pp");

  // const getUserBlogs = async () => {
  //   try {
  //     const res = await axios.get(
  //       `https://localhost:7141/api/Posts/ByAuthor/${profileUser?.id}`
  //     );
  //     setUserBlogs(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
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

  useEffect(() => {
    fetchPosts();
    fetchComments();
    // getUserBlogs();
    // getUser();
    fetchPostReactions();

    //eslint-disable-next-line
  }, []);
  console.log(userBlogs, "uu");
  const handleReaction = async (isCommentReaction, isPositive, id) => {
    try {
      if (!localStorage.getItem("token")) {
        return navigate("/login");
      }
      await axios.post("https://localhost:7141/api/PostReactions", {
        isPositive,
        user: user.id,
        postId: id,
        isCommentReaction,
        createdAt: new Date(),
      });
      fetchPostReactions();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  // const handleDeleteReaction = async () => {
  //   try {
  //     const reaction = reactions.find(
  //       (reaction) =>
  //         reaction.user === user.userId && reaction.postId === Number(params.id)
  //     );
  //     const id = reaction?.id;
  //     console.log(id);
  //     const response = await axios.delete(
  //       `https://localhost:7141/api/PostReactions/${id}`
  //     );
  //     console.log(response, "reactionRes");
  //     if (response.status === 204) {
  //       setIsLiked(false);
  //       setIsDisliked(false);
  //       fetchPostReactions();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.response.data.message || "Something went wrong");
  //   }
  // };

  const handleComment = async (data) => {
    try {
      if (!localStorage.getItem("token")) {
        return navigate("/login");
      }
      const submissionData = {
        ...data,
        user: user.id,
        createdAt: new Date(),
        postId: params.id,
      };
      const response = await axios.post(
        "https://localhost:7141/api/Comments",
        submissionData
      );
      if (response.status === 201) {
        fetchComments();
        toast.success("Comment added");
        closeModal();
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
        setPost(response.data);
        try {
          const res = await axios.get(
            `https://localhost:7141/api/Users/${response?.data?.author}`
          );
          setProfileUser(res.data);
        } catch (error) {
          console.log(error);
        }
        try {
          const res = await axios.get(
            `https://localhost:7141/api/Posts/ByAuthor/${response?.data?.author}`
          );
          setUserBlogs(res.data);
        } catch (error) {
          console.log(error);
        }
        // getUser();
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
      const reactionsData = response.data;

      const reactionsWithUserData = await Promise.all(
        reactionsData.map(async (reaction) => {
          // Fetch user data for each reaction
          const userResponse = await axios.get(
            `https://localhost:7141/api/Users/${reaction.user}`
          );
          const userData = userResponse.data;

          // Replace user id with user name in reaction object
          return {
            ...reaction,
            user: userData,
            // Assuming name is the property for user's name
          };
        })
      );

      const likedReactions = reactionsWithUserData.filter(
        (reaction) => reaction.isPositive === true
      );
      const dislikedReactions = reactionsWithUserData.filter(
        (reaction) => reaction.isPositive === false
      );
      setLikedReactions(likedReactions);
      setDislikedReactions(dislikedReactions);
      setReactions(reactionsWithUserData);
      if (reactionsData.length > 0) {
        const userReaction = reactionsData.find(
          (reaction) => reaction.user === user.id
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
  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();

  return (
    <Layout title={"Blog details"}>
      <div style={{ display: "flex" }}>
        <div>
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
                    handleReaction(false, true, params.id); //isCommentReaction, isPositive, id
                  }}
                />
              </Box>
            ) : (
              <Box _hover={{ cursor: "pointer" }}>
                <FaRegThumbsUp
                  color="blue"
                  onClick={() => {
                    handleReaction(false, true, params.id);
                  }}
                />
              </Box>
            )}
            {isDisliked ? (
              <Box _hover={{ cursor: "pointer" }}>
                <FaThumbsDown
                  color="blue"
                  onClick={() => {
                    handleReaction(false, false, params.id);
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
          </HStack>
          {/* <HStack
            _hover={{ cursor: "pointer" }}
            onClick={() => navigate(`/profile/${profileUser?.id}`)}
          >
            <Avatar size={"sm"} src={profileUser?.profilePic} />
            <Text variant={"subtitle1"}>{profileUser?.name}</Text>
          </HStack> */}
          <Text style={{ marginTop: "10px" }}>{post?.title}</Text>
          <Text variant={"subtitle2"}>{getDateAndTime(post?.createdAt)}</Text>
          <VStack>
            <ImageComponent
              style={{ marginTop: "10px" }}
              height={"400px"}
              width={"600px"}
              src={post?.images}
            />
          </VStack>
          <Text
            mb={10}
            variant={"heading4"}
            color={"black"}
            style={{ marginTop: "10px" }}
          >
            {post?.body}
          </Text>
        </div>
      </div>
      <form onSubmit={handleSubmit(handleComment)}>
        <Button
          onClick={openModal}
          style={{ backgroundColor: "#5b3b8c", color: "white" }}
        >
          Add Comment
        </Button>
      </form>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Comment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(handleComment)}>
              <TextareaField
                name={"content"}
                placeholder={"Comment"}
                register={register}
                errors={errors?.content?.message}
              />
              <Button
                type="submit"
                style={{
                  backgroundColor: "#5b3b8c",
                  color: "white",
                  marginTop: "10px",
                }}
              >
                Comment
              </Button>
            </form>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      {comments?.length > 0 ? (
        <VStack alignItems={"stretch"} style={{ marginTop: "20px" }}>
          {comments.map((comment) => (
            <>
              <CommentCard
                key={comment.id}
                id={comment.id}
                content={comment.content}
                userId={comment.user}
                createdAt={comment.createdAt}
                fetchComments={fetchComments}
                handleReaction={handleReaction}
              />
            </>
          ))}
        </VStack>
      ) : (
        <Text variant={"heading1"}>No comments</Text>
      )}

      {userBlogs.length > 0 && (
        <div
          style={{
            marginTop: "30px",
          }}
        >
          <VStack alignItems={"stretch"}>
            <Text>Users blogs</Text>
            <VStack
              alignItems="stretch"
              spacing={4}
              className="blog-grid"
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {userBlogs?.map((post) => (
                <BlogCard
                  key={post.id}
                  onClick={() => handleBlogClick(post.id)}
                  title={post.title}
                  body={post.body}
                  date={getDate(post.createdAt)}
                  image={post.images}
                />
              ))}
            </VStack>
          </VStack>
        </div>
      )}
    </Layout>
  );
};

export default BlogDetails;