import AccessDenied from "../pages/AccessDenied";

export const hybridRoutes = [
  {
    path: "/access-denied",
    element: <AccessDenied />,
    availability: ["user", "admin"],
  },
];
