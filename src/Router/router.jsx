import {
    createBrowserRouter,
  } from "react-router-dom";
import Mainlayout from "../Mainlayout/Mainlayout";
import Error from "../Components/Error";
import Home from "../Pages/Home";
import Membership from "../Pages/Membership";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import Notification from "../Pages/Notification";
import Dashboard from "../Pages/Dashboard";
import Privateroute from "./Privateroute";


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Mainlayout></Mainlayout>,
      errorElement: <Error></Error>,
      children: [
        {
          path: "/",
          element: <Home></Home>
        },
        {
          path: "/membership",
          element: <Membership></Membership>,
        },
        {
          path: "/login",
          element: <Login></Login>
        },
        {
          path: "/register",
          element: <Register></Register>,
        },
        {
          path: "/notification",
          element: <Notification></Notification>
        }
      ]
    },
    {
      path: "/dashboard",
      element: <Privateroute><Dashboard></Dashboard></Privateroute>,
    }
  ]);

  export default router;