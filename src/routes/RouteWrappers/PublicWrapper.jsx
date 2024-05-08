import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/userSlice";

const PublicWrapper = ({ children }) => {
  const dispatch = useDispatch();

  const decodedToken =
    localStorage.getItem("token") && jwtDecode(localStorage.getItem("token"));

  if (localStorage.getItem("token")) {
    const userId = Number(
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ]
    );
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
  }
  return children;
};

export default PublicWrapper;
