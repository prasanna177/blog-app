import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  HStack,
  Text,
  Textarea,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { createImageFromInitials, getDateAndTime } from "../../utils";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEdit, FaRegThumbsUp, FaTrash } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import DeleteComment from "../Modals/DeleteComment";
import ReactionModal from "../Modals/ReactionModal";
import { RepeatClockIcon } from "@chakra-ui/icons";
import CommentEditHistory from "../Modals/CommentEditHistory";

const CommentCard = ({
  id,
  content,
  userId,
  createdAt,
  fetchComments,
  // handleReaction,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [commentValue, setCommentValue] = useState(content);
  const inputRef = useRef(null);
  const params = useParams();
  const [reactions, setReactions] = useState([]);
  const [totalReactions, setTotalReactions] = useState(0);
  const [likedReactions, setLikedReactions] = useState(null);
  const [dislikedReactions, setDislikedReactions] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [editHistory, setEditHistory] = useState([]);
  const [profileUser, setProfileUser] = useState(null);

  // const [allReactions, setAllReactions] = useState([]);

  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const res = await axios.get(`https://localhost:7141/api/Users/${userId}`);
      setProfileUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReactions();
    getUser();
    //eslint-disable-next-line
  }, []);

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
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  const { user } = useSelector((state) => state.user);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const fetchEditHistory = async (commentId) => {
    try {
      const response = await axios.get(
        `https://localhost:7141/api/Comments/commentEditLogs/${commentId}`
      );
      setEditHistory(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReaction = async (isPositive, id) => {
    try {
      if (!localStorage.getItem("token")) {
        return navigate("/login");
      }
      const response = await axios.post(
        "https://localhost:7141/api/PostReactions",
        {
          isPositive,
          user: user?.id,
          postId: params.id,
          commentId: id,
          isCommentReaction: true,
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
  const fetchPostReactions = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7141/api/PostReactions/CommentReactions/${params.id}`
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
          (reaction) => reaction.user === user?.id
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
  console.log(editHistory, "edit");

  const handleInputEdit = async (e) => {
    if (e.key === "Escape") {
      setCommentValue(content);
      setIsEditMode(false);
    }
    if (e.key === "Enter") {
      try {
        const submissionData = {
          content: commentValue,
          user: user?.id,
          createdAt: new Date(),
          postId: params.id,
        };
        if (content !== commentValue) {
          const response = await axios.put(
            `https://localhost:7141/api/Comments/${id}`,
            submissionData
          );
          if (response.status === 200) {
            fetchComments();
            toast.success("Comment edited");
            setIsEditMode(false);
          } else {
            toast.error("Failed to edit comment.");
          }
        } else {
          setIsEditMode(false);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message || "Something went wrong");
      }
    }
  };

  const handleDelete = async () => {
    try {
      const submissionData = {
        content: commentValue,
        user: user?.id,
        createdAt: new Date(),
        postId: params.id,
      };
      console.log(submissionData);
      const response = await axios.delete(
        `https://localhost:7141/api/Comments/${id}`,
        submissionData
      );
      console.log(response);
      if (response.status === 204) {
        toast.success("Comment deleted");
        setIsEditMode(false);
        fetchComments();
      } else {
        toast.error("Failed to delete comment.");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  };
  // const fetchCommentor = async () => {
  //   const response = await axios.get()
  // }

  // useEffect(() => {
  //   fetchCommentor()
  // })
  const fetchReactions = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7141/api/PostReactions/CommentReactions/${id}`
      );
      // setAllReactions(response.data);
      if (response.data.length > 0) {
        const userReactions = response.data.filter(
          (reaction) => reaction.user === user.userId
        );
        for (let userReaction of userReactions) {
          if (userReaction) {
            setIsLiked(userReaction.isPositive);
            setIsDisliked(!userReaction.isPositive);
          } else {
            setIsLiked(false);
            setIsDisliked(false);
          }
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

  const {
    isOpen: isReactionOpen,
    onOpen: onReactionOpen,
    onClose: onReactionClose,
  } = useDisclosure();
  const {
    isOpen: isHistoryOpen,
    onOpen: onHistoryOpen,
    onClose: onHistoryClose,
  } = useDisclosure();

  return (
    <Card
      sx={{
        fontSize: "16px",
        width: "auto",
      }}
    >
      <ReactionModal
        isOpen={isReactionOpen}
        onClose={onReactionClose}
        likedReactions={likedReactions}
        dislikedReactions={dislikedReactions}
      />
      <DeleteComment
        body={"This action will delete this comment."}
        onClose={onDeleteClose}
        isOpen={isDeleteOpen}
        handleDelete={handleDelete}
      />
      <CommentEditHistory
        onClose={onHistoryClose}
        isOpen={isHistoryOpen}
        editHistory={editHistory}
      />
      <CardBody bg={"gray.10"}>
        <HStack justifyContent={"space-between"}>
          <Box>
            <HStack
              _hover={{ cursor: "pointer" }}
              onClick={() => navigate(`/profile/${profileUser?.id}`)}
            >
              <Avatar
                size={"sm"}
                src={
                  (localStorage.getItem("token") && profileUser?.profilePic) ||
                  createImageFromInitials(profileUser?.name)
                }
              />
              <Text>{profileUser?.name}</Text>
            </HStack>
            <Text variant={"subtitle2"}>Date: {getDateAndTime(createdAt)}</Text>
            {isEditMode ? (
              <VStack align={"stretch"}>
                <Textarea
                  value={commentValue}
                  onChange={(e) => setCommentValue(e.target.value)}
                  ref={inputRef}
                  onKeyDown={handleInputEdit}
                />
                <Text variant={"subtitle1"}>
                  Press escape to cancel and enter to save
                </Text>
              </VStack>
            ) : (
              <Text>{content}</Text>
            )}

            <HStack>
              {isLiked ? (
                <FaThumbsUp
                  color="blue"
                  onClick={() => {
                    console.log("removed liked");
                    handleReaction(true, id);
                  }}
                />
              ) : (
                <FaRegThumbsUp
                  color="blue"
                  onClick={() => {
                    handleReaction(true, id);
                  }}
                />
              )}
              {isDisliked ? (
                <FaThumbsDown
                  color="blue"
                  onClick={() => {
                    console.log("removed dislike");
                    handleReaction(false, id);
                  }}
                />
              ) : (
                <FaRegThumbsDown
                  color="blue"
                  onClick={() => {
                    handleReaction(false, id);
                  }}
                />
              )}
              <Text
                _hover={{ cursor: "pointer" }}
                onClick={() => onReactionOpen()}
              >
                {totalReactions}
              </Text>
              {user?.id === userId && !isEditMode && (
                <>
                  <Button
                    color={"warning.200"}
                    onClick={handleEditClick}
                    variant="ghost"
                    leftIcon={<FaEdit />}
                  >
                    Edit
                  </Button>
                  <Button
                    color={"error.100"}
                    onClick={() => onDeleteOpen()}
                    variant="ghost"
                    leftIcon={<FaTrash />}
                  >
                    Delete
                  </Button>
                </>
              )}
            </HStack>
          </Box>
          <Box
            _hover={{ cursor: "pointer" }}
            onClick={() => {
              onHistoryOpen();
              fetchEditHistory(id);
            }}
          >
            <RepeatClockIcon />
          </Box>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default CommentCard;
