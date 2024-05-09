// import React from "react";
/// import Sidebar from "../../components/AdminSidebar";
// import DashboardContent from "../../components/DashboardContent";

// function App() {
//   return (
//     <Flex>
//       <Sidebar />
//       <Box p="4">

//       </Box>
//     </Flex>
//   );
// }

// export default App;
import { Button, Box, Heading, VStack, Flex } from "@chakra-ui/react";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import TextField from "../../components/TextField";
import Password from "../../components/Password";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Sidebar from "../../components/AdminSidebar";

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
      data.role = "admin";
      data.profilePic = "";
      const response = await axios.post(
        `https://localhost:7141/api/Auth/signup`,
        data
      );
      console.log(response, "res");

      if (response.status === 200) {
        toast.success("Admin Created successfully");
      } else {
        toast.error("Failed to sign up");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  return (
    <>
      <Flex>
      <Sidebar />
 <Box
      maxW="xl"
      mx="auto"
      mt={20}
      p={8}
      height="90%"
      boxShadow="lg"
      borderRadius="xl"
      textAlign="center"
    >
      <VStack spacing={8} alignItems="center">
        <Heading as="h2" size="2xl">
          Create Admin
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
           
          </VStack>
        </form>
      </VStack>
    </Box>
    </Flex>
    </>
  );
};

export default Signup;
