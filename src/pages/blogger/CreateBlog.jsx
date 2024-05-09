import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import TextField from "../../components/TextField";
import { Button } from "@chakra-ui/react";
import ImageInput from "../../components/ImageInput";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import TextareaField from "../../components/TextareaField";
import toast from "react-hot-toast";
import Layout from "../../components/Layout/Layout";
import { useSelector } from "react-redux";

const CreateBlog = () => {
  const { user } = useSelector((state) => state.user);
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
      console.log(data);
      const formData = new FormData();
      formData.append("file", data.images);
      const filePathUrl = await axios.post(
        "https://localhost:7141/api/FileUpload/upload",
        formData
      );
      data.images = filePathUrl.data;
      data.author = user?.id;
      data.createdAt = new Date();
      console.log(data, "data");
      const response = await axios.post(
        "https://localhost:7141/api/Posts",
        data
      );
      if (response.status === 201) {
        toast.success("Post created successfully.");
        fetchPosts();
      } else {
        toast.error("Failed to create post");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      console.log("before");
      const response = await axios.get("https://localhost:7141/api/Posts");
      console.log(response, "after");
      if (response.status === 200) {
        setPosts(response.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  console.log(posts, "posts");

  return (
    <Layout>
      <h2>CREATE POST FORM</h2>
      <form onSubmit={handleSubmit(handlePostSubmit)}>
        <TextField
          name={"title"}
          placeholder={"title"}
          register={register}
          errors={errors?.title?.message}
        />
        <TextareaField
          name={"body"}
          placeholder={"body"}
          register={register}
          errors={errors?.body?.message}
        />
        <ImageInput
          width={"200px"}
          height={"200px"}
          image={blogImage}
          handleImageChange={(e) => handleImageChange(e, setBlogImage)}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Layout>
  );
};

export default CreateBlog;
