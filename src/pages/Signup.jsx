import { Button, Box, Heading, VStack } from "@chakra-ui/react";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import TextField from "../components/TextField";
import Password from "../components/Password";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const schema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .required("Email address is required")
      .email("Invalid email address"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
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
      data.role = "admin";
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
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  return (
    <Box
      maxW="xl"
      mx="auto"
      mt={20}
      p={8}
      boxShadow="lg"
      borderRadius="xl"
      textAlign="center"
    >
      <VStack spacing={8} alignItems="center">
        <Heading as="h2" size="2xl">
          SIGNUP FORM
        </Heading>
        <form onSubmit={handleSubmit(handleSignupSubmit)}>
          <VStack spacing={6} alignItems="stretch">
            <TextField
              name={"name"}
              register={register}
              errors={errors?.name?.message}
              placeholder={"Name"}
              size="lg"
            />
            <TextField
              name={"email"}
              register={register}
              errors={errors?.email?.message}
              placeholder={"Email"}
              size="lg"
            />
            <Password
              name={"password"}
              placeholder={"Password"}
              errors={errors?.password?.message}
              register={register}
              size="lg"
            />
            <Button type="submit" colorScheme="teal" size="lg" w="full">
              Signup
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                navigate("/login");
              }}
              size="lg"
              w="full"
            >
              Go to login
            </Button>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
};

export default Signup;
