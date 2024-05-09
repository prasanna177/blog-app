import { Button } from "@chakra-ui/react";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import TextField from "../components/TextField";
import Password from "../components/Password";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
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
    try {
      const response = await axios.post(
        `https://localhost:7141/api/Auth/login`,
        data
      );
      console.log(response, "res");
      if (response.status === 200) {
        window.location.reload();
        toast.success("Logged in successfully");
        localStorage.setItem("token", response.data.token);
      } else {
        toast.error("Failed to log in");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message || "Something went wrong");
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
        <Button
          onClick={() => {
            navigate("/signup");
          }}
        >
          Go to signup
        </Button>
      </form>
    </div>
  );
};

export default Login;
