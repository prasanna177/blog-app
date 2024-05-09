import {
  Box,
  Button,
  Card,
  CardBody,
  HStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import DeleteComment from "../Modals/DeleteComment";
import { useSelector } from "react-redux";
import { RepeatClockIcon } from "@chakra-ui/icons";

const BlogCard = ({ title, body, onClick, isProfile, blogId, profileUser }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteBlog = async () => {
    try {
      const response = await axios.delete(
        `https://localhost:7141/api/Posts/${blogId}`
      );
      console.log(response, "deleteRes");
      if (response.status === 204) {
        toast.success("Your blog has been deleted.");
        window.location.reload();
      } else {
        toast.error("Failed to delete blog");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  };
  return (
    <>
      <DeleteComment
        body={"This action will delete this blog. Do you want to continue"}
        onClose={onClose}
        isOpen={isOpen}
        handleDelete={handleDeleteBlog}
      />
      <Card onClick={onClick} _hover={{ cursor: "pointer" }}>
        <CardBody>
          <HStack justifyContent={"space-between"}>
            <Box>
              <Text>{title}</Text>
              <Text>{body}</Text>
            </Box>
            {isProfile && user?.id === profileUser.id && (
              <Box>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/edit-blog/${blogId}`);
                  }}
                >
                  Edit
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpen();
                  }}
                >
                  Delete
                </Button>
              </Box>
            )}
            <Box
              _hover={{ cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/blog/edit-history/${blogId}`);
              }}
            >
              <RepeatClockIcon />
            </Box>
          </HStack>
        </CardBody>
      </Card>
    </>
  );
};

export default BlogCard;
