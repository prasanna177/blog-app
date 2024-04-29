import { Button } from "@chakra-ui/react";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import TextField from "../components/TextField";
import Password from "../components/Password";
import { jwtDecode } from "jwt-decode";

const Login = () => {
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
    console.log(data, "data");
    try {
      const response = await axios.post(
        "https://localhost:7141/api/Auth/login",
        data
      );
      const decodedToken = jwtDecode(response.data.token);
      const userId =
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ];

      const role =
        decodedToken[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];

      console.log(userId, role);

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      console.log("User logged in successfully");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  return (
    <div>
      <h2>LOGIN FORM</h2>

      {/* Login Form */}
      <form onSubmit={handleSubmit(handleLoginSubmit)}>
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
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;
