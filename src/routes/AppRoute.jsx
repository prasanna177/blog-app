import { adminRoutes } from "./AdminRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { authenticationRoutes, surferRoutes } from "./PublicRoute";
import { bloggerRoutes } from "./BloggerRoute";
import RedirectIfLoggedIn from "./RouteWrappers/RedirectIfLoggedIn";
import RequireAuth from "./RouteWrappers/RequireAuth";
import { hybridRoutes } from "./HybridRoute";
import PublicWrapper from "./RouteWrappers/PublicWrapper";

const AppRoute = () => {
  const protectedRoutes = [...adminRoutes, ...bloggerRoutes, ...hybridRoutes];

  const authRoutes = [...authenticationRoutes];
  const publicRoutes = [...surferRoutes];
  return (
    <BrowserRouter>
      <Routes>
        {/* surfer le herna milne route */}
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<PublicWrapper>{route.element}</PublicWrapper>}
          />
        ))}

        {authRoutes.map((route) => (
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
              element={
                <RequireAuth userRoles={route?.availability}>
                  {route.element}
                </RequireAuth>
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
