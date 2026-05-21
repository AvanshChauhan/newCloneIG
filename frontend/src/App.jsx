import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { AuthProvider } from "./features/auth/auth.context";

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  );
};

export default App;
