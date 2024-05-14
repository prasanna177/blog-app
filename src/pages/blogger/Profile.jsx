import { useSelector } from "react-redux";
import Layout from "../../components/Layout/Layout";
import {
  Button,
  Grid,
  HStack,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
// import ImageComponent from "../../components/ImageComponent";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ImageComponent from "../../components/ImageComponent";
import BlogCard from "../../components/Cards/BlogCard";
import DeleteComment from "../../components/Modals/DeleteComment";
import toast from "react-hot-toast";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [profileUser, setProfileUser] = useState(null);
  const [userBlogs, setUserBlogs] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  const handleBlogClick = (id) => {
    navigate(`/blog/${id}`);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteProfile = async () => {
    try {
      const response = await axios.delete(
        `https://localhost:7141/api/Users/${user?.id}`
      );
      console.log(response, "deleteRes");
      if (response.status === 200) {
        localStorage.clear();
        window.location.reload();
        toast.success("Your profile has been deleted.");
      } else {
        toast.error("Failed to log in");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const getUser = async () => {
    try {
      const res = await axios.get(
        `https://localhost:7141/api/Users/${params.id}`
      );
      setProfileUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserBlogs = async () => {
    try {
      const res = await axios.get(
        `https://localhost:7141/api/Posts/ByAuthor/${params.id}`
      );
      setUserBlogs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    getUserBlogs();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout title={"Profile"}>
      <DeleteComment
        body={
          "This action will delete your profile permanently and cannot be reverted."
        }
        onClose={onClose}
        isOpen={isOpen}
        handleDelete={handleDeleteProfile}
      />
      <VStack gap={4} align={"stretch"}>
        {user?.id === profileUser?.id && (
          <HStack>
            <Button
              onClick={() => {
                navigate(`/edit-profile/${params.id}`);
              }}
              bg={"primary.0"}
              color={"white"}
            >
              Edit profile
            </Button>
            <Button
              bg={"error.100"}
              color={"white"}
              onClick={() => {
                onOpen();
              }}
            >
              Delete profile
            </Button>
          </HStack>
        )}

        <Text>{profileUser?.name}</Text>
        <ImageComponent
          isProfileImg={true}
          borderRadius={"50%"}
          width={"100px"}
          height={"100px"}
          src={profileUser?.profilePic}
        />
      </VStack>
      <VStack alignItems={"stretch"}>
        <Text mt={10} variant={"heading1"}>
          Posted blogs
        </Text>
        {userBlogs ? (
          <VStack alignItems={"stretch"}>
            <Grid templateColumns="repeat(5, 1fr)" gap={"16px"}>
              {userBlogs?.map((post) => (
                <BlogCard
                  key={post.id}
                  onClick={() => handleBlogClick(post.id)}
                  title={post.title}
                  body={post.body}
                  blogId={post.id}
                  image={post.images}
                  date={post.createdAt}
                  profileUser={profileUser}
                  isProfile={true}
                />
              ))}
            </Grid>
          </VStack>
        ) : (
          <Text variant={"subtitle1"}>No blogs posted</Text>
        )}
      </VStack>

      {/* <ImageComponent /> */}
    </Layout>
  );
};

export default Profile;
