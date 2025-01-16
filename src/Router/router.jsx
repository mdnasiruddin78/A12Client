import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import Mainlayout from "../Mainlayout/Mainlayout";
import Error from "../Components/Error";
import Home from "../Pages/Home";
import Membership from "../Pages/Membership";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import Notification from "../Pages/Notification";
import Privateroute from "./Privateroute";
import MyProfile from "../Pages/Dashboard/MyProfile";
import Addpost from "../Pages/Dashboard/Addpost";
import Mypost from "../Pages/Dashboard/Mypost";
import Dashboard from "../Mainlayout/Dashboard";
import AdminProfile from "../Pages/Dashboard/AdminProfile";
import ManageUser from "../Pages/Dashboard/ManageUser";
import ReportedComment from "../Pages/Dashboard/ReportedComment";
import MakeAnnounce from "../Pages/Dashboard/MakeAnnounce";


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
    children: [
      // normal user route
      {
        path: "myprofile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "addpost",
        element: <Addpost></Addpost>,
      },
      {
        path: "mypost",
        element: <Mypost></Mypost>,
      },
      // admin only routes
      {
        path: "adminProfile",
        element: <AdminProfile></AdminProfile>,
      },
      {
        path: "manageUser",
        element: <ManageUser></ManageUser>,
      },
      {
        path: "reportedComment",
        element: <ReportedComment></ReportedComment>,
      },
      {
        path: "makeAnnouncement",
        element: <MakeAnnounce></MakeAnnounce>,
      },
    ]
  }
]);

export default router;