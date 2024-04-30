import { adminRoutes } from "./AdminRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { authRoutes } from "./PublicRoute";
import { bloggerRoutes } from "./BloggerRoute";
import RedirectIfLoggedIn from "./RouteWrappers/RedirectIfLoggedIn";
import RequireAuth from "./RouteWrappers/RequireAuth";
import { hybridRoutes } from "./HybridRoute";
import CreateBlog from "../pages/blogger/CreateBlog";

const AppRoute = () => {
  const protectedRoutes = [...adminRoutes, ...bloggerRoutes, ...hybridRoutes];

  const publicRoutes = [...authRoutes];
  return (
    <BrowserRouter>
      <Routes>
        {/* surfer le herna milne route */}
        <Route
          key={"/create-blog"}
          path={"/create-blog"}
          element={<CreateBlog />}
        />
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
