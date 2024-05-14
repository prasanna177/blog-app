import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import AppRoute from "./routes/AppRoute";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Toaster position="top-center" reverseOrder={false} />
        <AppRoute />
      </ChakraProvider>
    </>
  );
};

export default App;
