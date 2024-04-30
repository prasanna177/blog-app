import BlogDetails from "../pages/blogger/BlogDetails";
// import CreateBlog from "../pages/blogger/CreateBlog";
import Home from "../pages/blogger/Home";

export const bloggerRoutes = [
  {
    path: "/",
    element: <Home />,
    availability: ["user"],
  },
  // {
  //   path: "/create-blog",
  //   element: <CreateBlog />,
  //   availability: ["user"],
  // },
  {
    path: "/blog/:id",
    element: <BlogDetails />,
    availability: ["user"],
  },
];
