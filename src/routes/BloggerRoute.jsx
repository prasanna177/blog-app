import ChangePassword from "../pages/ChangePassword";
import Home from "../pages/blogger/Home";
import Profile from "../pages/blogger/Profile";

export const bloggerRoutes = [
  {
    path: "/",
    element: <Home />,
    availability: ["user"],
  },
  {
    path: "/profile/:id",
    element: <Profile />,
    availability: ["user"],
  },
  {
    path: "change-password",
    element: <ChangePassword />,
    availability: ["user"],
  },
];
