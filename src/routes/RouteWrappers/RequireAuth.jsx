import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const RequireAuth = ({ children, userRoles }) => {

  const clearLocalStorageOnError = (error) => {
    if (error.response && error.response.status === 403) {
      localStorage.removeItem("token");
    }
  };

  // Setup Axios interceptors
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        clearLocalStorageOnError(error);
        return Promise.reject(error);
      }
    );

    return () => {
      // Cleanup interceptor on component unmount
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  let currentUserRole;
  if (localStorage.getItem("token")) {
    const decodedToken = jwtDecode(localStorage.getItem("token"));
    currentUserRole =
      decodedToken[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ];
  }
  if (currentUserRole) {
    if (userRoles) {
      if (userRoles.includes(currentUserRole)) {
        return children;
      } else {
        return <Navigate to={"/access-denied"} />;
      }
    } else {
      return children;
    }
  } else {
    return <Navigate to="/login" />;
  }
};

export default RequireAuth;
