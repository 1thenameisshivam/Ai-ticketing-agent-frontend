import App from "./App";
import { createBrowserRouter } from "react-router";
import Signup from "./pages/Signup";
import Root from "./layouts/Root";
import Home from "./pages/Home";
import NonAuth from "./layouts/NonAuth";
import Authenticated from "./layouts/Authenticated";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        path: "/",
        Component: Authenticated,
        children: [
          {
            path: "/",
            Component: Home,
          },
        ],
      },
      {
        path: "/",
        Component: NonAuth,
        children: [
          {
            path: "/signup",
            Component: Signup,
          },
          {
            path: "/login",
            Component: Login,
          },
        ],
      },
    ],
  },
]);

export default router;
