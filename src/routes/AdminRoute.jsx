import AdminHome from "../pages/admin/AdminHome";

export const adminRoutes = [
  {
    path: "/admin",
    element: <AdminHome />,
    availability: ["admin"],
  },
];
