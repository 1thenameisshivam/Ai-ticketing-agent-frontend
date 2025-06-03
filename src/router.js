import App from "./App";
import { createBrowserRouter } from "react-router";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/signup",
    Component: Signup,
  },
]);

export default router;
