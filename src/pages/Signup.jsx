import { Button } from "@chakra-ui/react";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import TextField from "../components/TextField";
import Password from "../components/Password";

const Signup = () => {
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
      const response = await axios.post(
        `https://localhost:7141/api/Auth/signup`,
        data
      );
      console.log(response, "res");

      if (!response.ok) {
        throw new Error("Failed to signup");
      }

      console.log("User signed up successfully");
    } catch (error) {
      console.error("Error signing up:", error.message);
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
      </form>
    </>
  );
};

export default Signup;
