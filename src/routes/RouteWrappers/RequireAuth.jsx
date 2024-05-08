import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/userSlice";

const RequireAuth = ({ children, userRoles }) => {
  const dispatch = useDispatch();

  const decodedToken =
    localStorage.getItem("token") && jwtDecode(localStorage.getItem("token"));

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
    const userId =
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ];
    const role =
      decodedToken[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ];
    const email =
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
      ];
    const name =
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
      ];
    dispatch(setUser({ userId, role, email, name }));
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
