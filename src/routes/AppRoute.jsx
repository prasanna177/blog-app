import { adminRoutes } from "./AdminRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { authRoutes } from "./PublicRoute";
import { bloggerRoutes } from "./BloggerRoute";

const AppRoute = () => {
  const protectedRoutes = [...adminRoutes, ...bloggerRoutes];

  const publicRoutes = [...authRoutes];
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

        {protectedRoutes.map((route) => {
          return (
            <Route key={route.path} path={route.path} element={route.element} />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
