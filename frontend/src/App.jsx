import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { AuthProvider } from "./features/auth/auth.context";
import { PostContextProvider } from "./features/post/Post.context";

const App = () => {
  return (
    <AuthProvider>
      <PostContextProvider>
        <RouterProvider router={routes} />
      </PostContextProvider>
    </AuthProvider>
  );
};

export default App;
