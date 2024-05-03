import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/userSlice";

const PublicWrapper = ({ children }) => {
  const dispatch = useDispatch();

  const decodedToken =
    localStorage.getItem("token") && jwtDecode(localStorage.getItem("token"));

  if (localStorage.getItem("token")) {
    const userId =
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ];
    dispatch(setUser(userId));
  }
  return children;
};

export default PublicWrapper;
