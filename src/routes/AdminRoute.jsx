import AdminHome from "../pages/admin/AdminHome";
import CreateAdmin from "../pages/admin/CreateAdmin";
import AdminBlogs from "../pages/admin/AdminBlogs";
import AdminUsers from "../pages/admin/AdminUsers";

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
  {
    path: "/admin/blogs",
    element: <AdminBlogs />,
    availability: ["admin"],
  },
  {
    path: "/admin/users",
    element: <AdminUsers />,
    availability: ["admin"],
  },
];
