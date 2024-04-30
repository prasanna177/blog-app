import { Button } from "@chakra-ui/react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();
  return (
    <div>
      <p>Admin Home</p>
      <Button
        onClick={() => {
          localStorage.clear();
          toast.success("Logged out successfully");
          navigate("/login");
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default AdminHome;
