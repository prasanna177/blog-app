import { Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AccessDenied = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Text>Access Denied</Text>
      <Button onClick={() => navigate("/")}>Go back</Button>
    </div>
  );
};

export default AccessDenied;
