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
    oldPassword: yup.string().required("Old password is required"),
    newPassword: yup
      .string()
      .required("New password is required")
      .min(8, "Password must be at least 8 characters long"),
    reEnteredPassword: yup
      .string()
      .required("Please type your password")
      .oneOf([yup.ref("newPassword")], "Passwords do not match"),
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
        `${import.meta.env.VITE_SERVER_PORT}/api/auth/change-password`,
        { ...data, userId: user.userId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const { success, message } = response.data;
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
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
            name={"oldPassword"}
            errors={errors?.oldPassword?.message}
            placeholder={"Old Password"}
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
          <Password
            width={"500px"}
            register={register}
            label={"Re-enter new password"}
            autocomplete="new-password"
            name={"reEnteredPassword"}
            errors={errors?.reEnteredPassword?.message}
            placeholder={"Re-Enter password"}
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
