import { Button } from "@chakra-ui/react";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import TextField from "../components/TextField";
import Password from "../components/Password";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const schema = yup.object({
    name: yup.string().required("Name address is required"),
    email: yup.string().required("Email address is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSignupSubmit = async (data) => {
    try {
      console.log(data, "data");
      data.role = "user";
      data.profilePic = "";
      const response = await axios.post(
        `https://localhost:7141/api/Auth/signup`,
        data
      );
      console.log(response, "res");

      if (response.status === 200) {
        toast.success("User signed up successfully");
        navigate("/login");
      } else {
        toast.error("Failed to sign up");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message || 'Something went wrong');
    }
  };

  return (
    <>
      <h2>SIGNUP FORM</h2>

      <form onSubmit={handleSubmit(handleSignupSubmit)}>
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
        <Password
          name={"password"}
          placeholder={"Password"}
          errors={errors?.password?.message}
          register={register}
        />
        <Button type="submit">Signup</Button>
        <Button
          onClick={() => {
            navigate("/login");
          }}
        >
          Go to login
        </Button>
      </form>
    </>
  );
};

export default Signup;
