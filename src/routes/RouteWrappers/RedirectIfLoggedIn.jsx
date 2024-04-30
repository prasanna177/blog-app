import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const RedirectIfLoggedIn = ({ children }) => {
  let currentUserRole;
  if (localStorage.getItem("token")) {
    const decodedToken = jwtDecode(localStorage.getItem("token"));
    console.log(decodedToken)
    currentUserRole =
      decodedToken[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ];
    console.log(currentUserRole,'role');
  }
  if (localStorage.getItem("token")) {
    if (currentUserRole === "user") {
      return <Navigate to="/" />;
    } else if (currentUserRole === "admin") {
      return <Navigate to="/admin" />;
    }
  }
  return children;
};

export default RedirectIfLoggedIn;
