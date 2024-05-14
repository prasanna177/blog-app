import EditHistory from "../pages/EditHistory";
import ForgotPassword from "../pages/ForgotPassword";
import Login from "../pages/Login";
import ResetPassword from "../pages/ResetPassword";
import Signup from "../pages/Signup";
import BlogDetails from "../pages/blogger/BlogDetails";
import CreateBlog from "../pages/blogger/CreateBlog";
import Home from "../pages/blogger/Home";

export const authenticationRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
];

export const surferRoutes = [
  {
    path: "/create-blog",
    element: <CreateBlog />,
  },
  {
    path: "/blog/edit-history/:id",
    element: <EditHistory />,
  },
  {
    path: "/blog/:id",
    element: <BlogDetails />,
  },
  {
    path: "/",
    element: <Home />,
  },
];
