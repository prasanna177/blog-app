import {
  Button,
  Card,
  CardBody,
  HStack,
  Input,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

import { getDateAndTime } from "../../utils";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import DeleteComment from "../Modals/DeleteComment";
import ReactionModal from "../Modals/ReactionModal";

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
  // const [allReactions, setAllReactions] = useState([]);

  useEffect(() => {
    fetchReactions();
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

  const handleReaction = async (isPositive, id) => {
    try {
      const response = await axios.post(
        "https://localhost:7141/api/PostReactions",
        {
          isPositive,
          user: user.id,
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
  const handleInputEdit = async (e) => {
    if (e.key === "Escape") {
      setCommentValue(content);
      setIsEditMode(false);
    }
    if (e.key === "Enter") {
      try {
        const submissionData = {
          content: commentValue,
          user: user.id,
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
        user: user.id,
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

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Card
      sx={{
        fontSize: "16px",
        width: "auto",
      }}
    >
      <ReactionModal
        isOpen={isOpen}
        onClose={onClose}
        likedReactions={likedReactions}
        dislikedReactions={dislikedReactions}
      />
      <DeleteComment
        body={"This action will delete this comment."}
        onClose={onDeleteClose}
        isOpen={isDeleteOpen}
        handleDelete={handleDelete}
      />
      <CardBody bg={"gray.10"}>
        <Text>{userId}</Text>
        <Text style={{ fontSize: "10px" }}>
          Date: {getDateAndTime(createdAt)}
        </Text>
        {isEditMode ? (
          <VStack align={"stretch"}>
            <Input
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
          <Text>Comment: {content}</Text>
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
          <Text _hover={{ cursor: "pointer" }} onClick={() => onOpen()}>
            {totalReactions}
          </Text>

          {user.id === userId && !isEditMode && (
            <div style={{ marginLeft: "20px" }}>
              <Button
                onClick={handleEditClick}
                color={"warning.200"}
                variant="ghost"
                leftIcon={<FaEdit />}
              >
                Edit
              </Button>
              <Button
                onClick={() => onDeleteOpen()}
                color={"error.100"}
                variant="ghost"
                leftIcon={<FaTrash />}
              >
                Delete
              </Button>
            </div>
          )}
        </HStack>
      </CardBody>
    </Card>
  );
};

export default CommentCard;
