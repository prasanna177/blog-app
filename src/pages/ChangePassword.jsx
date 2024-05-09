import { Box, Button, Flex, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import Layout from "../components/Layout/Layout";
import Password from "../components/Password";

const ChangePassword = () => {
  const { user } = useSelector((state) => state.user);

  const schema = yup.object({
    currentPassword: yup.string().required("Old password is required"),
    newPassword: yup
      .string()
      .required("New password is required")
      .min(8, "Password must be at least 8 characters long"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `https://localhost:7141/api/Users/ChangePassword`,
        { ...data, userId: user?.id }
      );
      if (response.status === 200) {
        toast.success("Password changed successfully");
      } else {
        toast.error("Failed to change passsword");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Change password"}>
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="username"
          autoComplete="username email"
          style={{ display: "none" }}
          aria-hidden="true"
        />
        <VStack gap={7} alignItems={"stretch"}>
          <Password
            width={"500px"}
            register={register}
            label={"Enter old password"}
            autocomplete="new-password"
            name={"currentPassword"}
            errors={errors?.currentPassword?.message}
            placeholder={"Current Password"}
          />
          <Password
            width={"500px"}
            register={register}
            label={"Enter new password"}
            autocomplete="new-password"
            name={"newPassword"}
            errors={errors?.newPassword?.message}
            placeholder={"New Password"}
          />
        </VStack>
        <Flex mt={5} w={"100%"} justifyContent={"start"}>
          <Button color={"white"} bgColor={"primary.0"} type="submit" px={20}>
            Save
          </Button>
        </Flex>
      </Box>
    </Layout>
  );
};

export default ChangePassword;
