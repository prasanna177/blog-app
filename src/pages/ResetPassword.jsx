import { Box, Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import Password from "../components/Password";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { id, token } = useParams();

  const schema = yup.object({
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_SERVER_PORT
        }/api/auth/reset-password/${id}/${token}`,
        data
      );
      const { success, message } = response.data;
      if (success) {
        toast.success(message);
        navigate("/");
      } else {
        toast.error(message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };
  return (
    <Flex h={"100dvh"} justifyContent={"center"} alignItems={"center"}>
      <Box
        boxShadow={"md"}
        borderRadius={"10px"}
        p={"30px"}
        maxWidth={"500px"}
        w={"100%"}
        bgColor={"white"}
      >
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
          <VStack alignItems={"start"}>
            <VStack mb={5} alignItems={"start"}>
              <Text fontSize={"2xl"} fontWeight={"bold"}>
                Reset password
              </Text>
              <Text color={"gray.100"} fontSize={"lg"}>
                Please enter a new password.
              </Text>
            </VStack>
            <VStack alignItems={"start"} gap={3} w={"100%"}>
              <VStack alignItems={"start"} w={"100%"} gap={8}>
                <Password
                  register={register}
                  name={"password"}
                  placeholder={"Password"}
                  errors={errors?.password?.message}
                />
                <HStack w={"100%"} justifyContent={"flex-end"}>
                  <Link to={"/"}>
                    <Button type="button">Cancel</Button>
                  </Link>
                  <Button
                    type="submit"
                    rightIcon={<ArrowRightIcon />}
                    _hover={{ opacity: 0.8 }}
                    _active={{}}
                    color={"white"}
                    colorScheme="teal"
                  >
                    Change password
                  </Button>
                </HStack>
              </VStack>
            </VStack>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
};

export default ResetPassword;
