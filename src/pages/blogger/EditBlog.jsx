import { Button, VStack } from "@chakra-ui/react";
import ImageInput from "../../components/ImageInput";
import Layout from "../../components/Layout/Layout";
import TextField from "../../components/TextField";
import TextareaField from "../../components/TextareaField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const EditBlog = () => {
  const { user } = useSelector((state) => state.user);
  const [blogImage, setBlogImage] = useState("");
  const [blog, setBlog] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  const schema = yup.object({
    title: yup.string().required("Title is required"),
    body: yup.string().required("Body is required"),
  });

  console.log(blogImage);
  const getBlogById = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7141/api/Posts/${params.id}`
      );
      setBlog(response.data);
      console.log(response, "blogbyid");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogById();
    //eslint-disable-next-line
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleImageChange = (e, setImage) => {
    setImage(e.target.files[0]);
  };

  console.log(blogImage, "blg");

  const handleEdit = async (data) => {
    try {
      data.images = blogImage;
      if (typeof data.images === "object") {
        const formData = new FormData();
        formData.append("file", data.images);
        const filePathUrl = await axios.post(
          "https://localhost:7141/api/FileUpload/upload",
          formData
        );
        data.images = filePathUrl.data;
      }
      data.author = user?.id;
      const response = await axios.put(
        `https://localhost:7141/api/Posts/${params.id}`,
        data
      );
      if (response.status === 200) {
        toast.success("Edited blog successfully");
        navigate(`/profile/${user.id}`);
      } else {
        toast.error("Failed to edit profile");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  useEffect(() => {
    // Set default values after getting tutor information
    setValue("title", blog?.title || "");
    setValue("body", blog?.body || "");
    setBlogImage(blog?.images || "");
    //eslint-disable-next-line
  }, [blog, setValue]);

  return (
    <Layout title={"Edit blog"}>
      <form onSubmit={handleSubmit(handleEdit)}>
        <VStack spacing={4} w={"500px"}>
          <TextField
            label={"Title"}
            name={"title"}
            placeholder={"title"}
            register={register}
            errors={errors?.title?.message}
          />
          <TextareaField
            label={"Body"}
            name={"body"}
            placeholder={"body"}
            register={register}
            errors={errors?.body?.message}
          />
          <ImageInput
            text={"Blog image"}
            width={"200px"}
            height={"200px"}
            image={blogImage}
            handleImageChange={(e) => handleImageChange(e, setBlogImage)}
          />
          <Button w={"100%"} bg={"primary.0"} color={"white"} type="submit">
            Save
          </Button>
        </VStack>
      </form>
    </Layout>
  );
};

export default EditBlog;
