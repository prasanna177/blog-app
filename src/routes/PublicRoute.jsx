import AccessDenied from "../pages/AccessDenied";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

export const authRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/access-denied",
    element: <AccessDenied />,
  },
];
