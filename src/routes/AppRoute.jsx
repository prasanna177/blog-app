import { adminRoutes } from "./AdminRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { authRoutes } from "./PublicRoute";
import { bloggerRoutes } from "./BloggerRoute";
import RedirectIfLoggedIn from "./RouteWrappers/RedirectIfLoggedIn";
import RequireAuth from "./RouteWrappers/RequireAuth";

const AppRoute = () => {
  const protectedRoutes = [...adminRoutes, ...bloggerRoutes];

  const publicRoutes = [...authRoutes];
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<RedirectIfLoggedIn>{route.element}</RedirectIfLoggedIn>}
          />
        ))}

        {protectedRoutes.map((route) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={<RequireAuth>{route.element}</RequireAuth>}
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
