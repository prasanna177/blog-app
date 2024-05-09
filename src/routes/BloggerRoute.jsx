import ChangePassword from "../pages/ChangePassword";
import EditBlog from "../pages/blogger/EditBlog";
import EditProfile from "../pages/blogger/EditProfile";
import Profile from "../pages/blogger/Profile";

export const bloggerRoutes = [

  {
    path: "/profile/:id",
    element: <Profile />,
    availability: ["user"],
  },
  {
    path: "edit-profile/:id",
    element: <EditProfile />,
    availability: ["user"],
  },
  {
    path: "edit-blog/:id",
    element: <EditBlog />,
    availability: ["user"],
  },
  {
    path: "change-password",
    element: <ChangePassword />,
    availability: ["user"],
  },
];
