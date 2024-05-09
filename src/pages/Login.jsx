import { Button, Box, Heading, VStack } from "@chakra-ui/react";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import TextField from "../components/TextField";
import Password from "../components/Password";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const schema = yup.object({
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

  const handleLoginSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://localhost:7141/api/Auth/login`,
        data
      );
      console.log(response, "res");
      if (response.status === 200) {
        toast.success("Logged in successfully");
        localStorage.setItem("token", response.data.token);
        // Redirect to dashboard or home page after successful login
        navigate("/");
      } else {
        toast.error("Failed to log in");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      setIsLoading(false);
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
          LOGIN FORM
        </Heading>
        <form onSubmit={handleSubmit(handleLoginSubmit)}>
          <VStack spacing={6} alignItems="stretch">
            <TextField
              name={"email"}
              register={register}
              errors={errors?.email?.message}
              placeholder={"Email"}
              size="lg"
              width="100%" // Increase width here
            />
            <Password
              name={"password"}
              placeholder={"Password"}
              errors={errors?.password?.message}
              register={register}
              size="lg"
              width="100%" // Increase width here
            />
            <Button
              type="submit"
              colorScheme="teal"
              isLoading={isLoading}
              loadingText="Logging In..."
              size="lg"
              w="full"
            >
              Login
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                navigate("/signup");
              }}
              size="lg"
              w="full"
            >
              Go to signup
            </Button>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
};

export default Login;
