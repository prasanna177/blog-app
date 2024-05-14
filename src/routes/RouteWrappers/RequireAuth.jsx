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
  let userId;
  if (localStorage.getItem("token")) {
    userId =
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ];
    currentUserRole =
      decodedToken[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ];
  }

  const getUser = async () => {
    try {
      const res = await axios.get(`https://localhost:7141/api/Users/${userId}`);
      dispatch(setUser(res.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
    //eslint-disable-next-line
  }, [])
  console.log(currentUserRole,'role')

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
    return <Navigate to="/" />;
  }
};

export default RequireAuth;
