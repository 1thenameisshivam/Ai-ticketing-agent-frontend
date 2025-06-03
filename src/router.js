import App from "./App";
import { createBrowserRouter } from "react-router";
import Signup from "./pages/Signup";
import Root from "./layouts/Root";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        path: "/",
        Component: Home,
      },
    ],
  },
  {
    path: "/signup",
    Component: Signup,
  },
]);

export default router;
