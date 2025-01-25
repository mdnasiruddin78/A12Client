import {
  createBrowserRouter,
} from "react-router-dom";
import Mainlayout from "../Mainlayout/Mainlayout";
import Error from "../Components/Error";
import Home from "../Pages/Home";
import Membership from "../Pages/Membership";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import Privateroute from "./Privateroute";
import MyProfile from "../Pages/Dashboard/MyProfile";
import Addpost from "../Pages/Dashboard/Addpost";
import Mypost from "../Pages/Dashboard/Mypost";
import Dashboard from "../Mainlayout/Dashboard";
import AdminProfile from "../Pages/Dashboard/AdminProfile";
import ManageUser from "../Pages/Dashboard/ManageUser";
import ReportedComment from "../Pages/Dashboard/ReportedComment";
import MakeAnnounce from "../Pages/Dashboard/MakeAnnounce";
import AdminRoute from "./AdminRoute";
import CardDetails from "../Components/CardDetails";
import Comment from "../Pages/Dashboard/Comment";


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
        element: <Privateroute><Membership></Membership></Privateroute>,
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
        path: "/addPost/:id",
        element: <Privateroute><CardDetails></CardDetails></Privateroute>,
      }
    ]
  },
  {
    path: "/dashboard",
    errorElement: <Error></Error>,
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
      {
        path: "comment/:id",
        element: <Comment></Comment>,
      },
      // admin only routes
      {
        path: "adminProfile",
        element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>,
      },
      {
        path: "manageUser",
        element: <AdminRoute><ManageUser></ManageUser></AdminRoute>,
      },
      {
        path: "reportedComment",
        element: <AdminRoute><ReportedComment></ReportedComment></AdminRoute>,
      },
      {
        path: "makeAnnouncement",
        element: <AdminRoute><MakeAnnounce></MakeAnnounce></AdminRoute>,
      },
    ]
  }
]);

export default router;