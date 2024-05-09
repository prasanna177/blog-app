import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/userSlice";
import { useEffect } from "react";
import axios from "axios";

const PublicWrapper = ({ children }) => {
  const dispatch = useDispatch();

  const decodedToken =
    localStorage.getItem("token") && jwtDecode(localStorage.getItem("token"));

  let userId;
  if (localStorage.getItem("token")) {
    userId =
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
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
  }, []);
  return children;
};

export default PublicWrapper;
