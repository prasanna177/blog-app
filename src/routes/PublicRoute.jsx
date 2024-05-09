import Login from "../pages/Login";
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
];

export const surferRoutes = [
  {
    path: "/create-blog",
    element: <CreateBlog />,
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
