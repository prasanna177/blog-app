import {
  Button,
  Card,
  CardBody,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
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

const CommentCard = ({
  id,
  content,
  userId,
  createdAt,
  fetchComments,
  handleReaction,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [commentValue, setCommentValue] = useState(content);
  const inputRef = useRef(null);
  const params = useParams();

  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  const { user } = useSelector((state) => state.user);

  const handleEditClick = () => {
    setIsEditMode(true);
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
          user,
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
        user,
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
  return (
    <Card>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text variant={"subtitle1"}>
              This action will delete this comment.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={handleDelete}
              variant="ghost"
              bg={"error.100"}
              color={"white"}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <CardBody bg={"gray.100"}>
        <Text>User:{userId}</Text>
        <Text>Date: {getDateAndTime(createdAt)}</Text>
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
        {user === userId && !isEditMode && (
          <>
            <Button
              bg={"warning.200"}
              color={"white"}
              onClick={handleEditClick}
            >
              Edit
            </Button>
            <Button bg={"error.100"} color={"white"} onClick={() => onOpen()}>
              Delete
            </Button>
            <HStack>
              {isLiked ? (
                <FaThumbsUp
                  color="blue"
                  onClick={() => {
                    setIsLiked(false);
                    console.log("removed liked");
                  }}
                />
              ) : (
                <FaRegThumbsUp
                  color="blue"
                  onClick={() => {
                    setIsLiked(true);
                    setIsDisliked(false);
                    handleReaction(true, true, id);
                  }}
                />
              )}
              {isDisliked ? (
                <FaThumbsDown
                  color="blue"
                  onClick={() => {
                    setIsDisliked(false);
                    console.log("removed dislike");
                  }}
                />
              ) : (
                <FaRegThumbsDown
                  color="blue"
                  onClick={() => {
                    setIsDisliked(true);
                    setIsLiked(false);
                    handleReaction(true, false, id);
                  }}
                />
              )}
              <Text>40</Text>
            </HStack>
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default CommentCard;
