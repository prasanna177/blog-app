import AdminHome from "../pages/admin/AdminHome";
import CreateAdmin from "../pages/admin/CreateAdmin";

export const adminRoutes = [
  {
    path: "/admin",
    element: <AdminHome />,
    availability: ["admin"],
  },
  {
    path: "/admin/create-user",
    element: <CreateAdmin />,
    availability: ["admin"],
  },
];
