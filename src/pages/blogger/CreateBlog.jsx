import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import TextField from "../../components/TextField";
import { Button } from "@chakra-ui/react";
import ImageInput from "../../components/ImageInput";
import { useForm } from "react-hook-form";
import { useState } from "react";
import TextareaField from "../../components/TextareaField";
import toast from "react-hot-toast";

const CreateBlog = () => {
  const [blogImage, setBlogImage] = useState("");

  const handleImageChange = (e, setImage) => {
    setImage(e.target.files[0]);
  };

  const schema = yup.object({
    title: yup.string().required("Title is required"),
    body: yup.string().required("Body is required"),
    author: yup.number().required("Please enter author's no."),
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
      data.createdAt = new Date()
      console.log(data, "data");
      const response = await axios.post(
        "https://localhost:7141/api/Posts",
        data
      );
      console.log(response, "res");
      if (response.status === 201) {
        toast.success("Post created successfully.");
      } else {
        toast.error("Failed to create post");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  };
  return (
    <div>
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
        <TextField
          name={"author"}
          register={register}
          placeholder={"Author"}
          errors={errors?.author?.message}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default CreateBlog;
