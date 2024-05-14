import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Button, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import TextField from "../../components/TextField";
import TextareaField from "../../components/TextareaField";
import ImageInput from "../../components/ImageInput";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CreateBlog = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [blogImage, setBlogImage] = useState("");
  const [posts, setPosts] = useState(null);
  console.log(posts);

  const handleImageChange = (e, setImage) => {
    setImage(e.target.files[0]);
  };

  const schema = yup.object({
    title: yup.string().required("Title is required"),
    body: yup.string().required("Body is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handlePostSubmit = async (data) => {
    try {
      data.images = blogImage;
      const formData = new FormData();
      formData.append("file", data.images);
      const filePathUrl = await axios.post(
        "https://localhost:7141/api/FileUpload/upload",
        formData
      );
      data.images = filePathUrl.data;
      data.author = user?.id;
      data.createdAt = new Date();
      const response = await axios.post(
        "https://localhost:7141/api/Posts",
        data
      );
      if (response.status === 201) {
        toast.success("Post created successfully.");
        navigate("/");
      } else {
        toast.error("Failed to create post");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("https://localhost:7141/api/Posts");
      if (response.status === 200) {
        setPosts(response.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <Layout title={"Create blog"}>
      <form onSubmit={handleSubmit(handlePostSubmit)}>
        <VStack spacing={4} w={"500px"}>
          <TextField
            label={"Blog title"}
            name={"title"}
            placeholder={"Title"}
            register={register}
            errors={errors?.title?.message}
          />
          <TextareaField
          label={"Blog content"}
            name={"body"}
            placeholder={"Body"}
            register={register}
            errors={errors?.body?.message}
          />
          <ImageInput
            width={"200px"}
            height={"200px"}
            image={blogImage}
            handleImageChange={(e) => handleImageChange(e, setBlogImage)}
          />
          <Button
            w={"100%"}
            onClick={handleSubmit(handlePostSubmit)}
            colorScheme="blue"
            style={{ backgroundColor: "#5b3b8c", color: "white" }}
          >
            Submit
          </Button>
        </VStack>
      </form>
    </Layout>
  );
};

export default CreateBlog;
