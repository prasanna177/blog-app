import { useSelector } from "react-redux";
import Layout from "../../components/Layout/Layout";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ImageInput from "../../components/ImageInput";
import { useNavigate } from "react-router-dom";
import TextField from "../../components/TextField";
import { useForm } from "react-hook-form";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import toast from "react-hot-toast";

const EditProfile = () => {
  const { user } = useSelector((state) => state.user);
  const [profilePic, setProfilePic] = useState("");
  const navigate = useNavigate();

  const schema = yup.object({
    name: yup.string().required("Name address is required"),
    email: yup.string().required("Email address is required"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setValue("name", user?.name || "");
    setValue("email", user?.email || "");
    setProfilePic(user?.profilePic || "");
  }, [user, setValue]);

  const handleImageChange = (e, setImage) => {
    setImage(e.target.files[0]);
  };
  console.log(profilePic, "pp");

  const handleEditProfile = async (data) => {
    try {
      data.profilePic = profilePic;
      if (typeof data.profilePic === "object") {
        const formData = new FormData();
        formData.append("file", data.profilePic);
        const filePathUrl = await axios.post(
          `https://localhost:7141/api/FileUpload/upload`,
          formData
        );
        data.profilePic = filePathUrl.data;
      }
      const response = await axios.put(
        `https://localhost:7141/api/Users/${user?.id}`,
        data
      );
      if (response.status === 200) {
        toast.success("Edited profile successfully");
        navigate(`/profile/${user.id}`);
      } else {
        toast.error("Failed to edit profile");
      }
      console.log(response);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit(handleEditProfile)}>
        <TextField
          name={"name"}
          register={register}
          errors={errors?.name?.message}
          placeholder={"Name"}
        />
        <TextField
          name={"email"}
          register={register}
          errors={errors?.email?.message}
          placeholder={"Email"}
        />
        <ImageInput
          width={"200px"}
          height={"200px"}
          text={"Enter your photo here"}
          image={profilePic}
          handleImageChange={(e) => handleImageChange(e, setProfilePic)}
          isProfileImg={true}
        />
        <Button type="submit">Save</Button>
      </form>
    </Layout>
  );
};

export default EditProfile;
