import { BsFillPostcardFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { HiMiniUsers } from "react-icons/hi2";
import { IoNotifications } from "react-icons/io5";
import { MdAdminPanelSettings, MdAnnouncement, MdCardMembership, MdMessage, MdOutlinePhoneAndroid, MdReport } from "react-icons/md";
import { Link, NavLink, Outlet, useLocation} from "react-router-dom";
import logo from '../assets/83a58a6b-7eb0-49f5-ac35-1a7a3bd00b00.jfif';
import UseAdmin from "../Hooks/UseAdmin";
import { Helmet } from "react-helmet-async";
import { FiLogOut } from "react-icons/fi";
import { useContext } from "react";
import { authContext } from "../Provider/Authprovider";
import UseNotification from "../Hooks/UseNotification";
import AdminProfile from "../Pages/Dashboard/AdminProfile";
import MyProfile from "../Pages/Dashboard/MyProfile";
import toast from "react-hot-toast";


const Dashboard = () => {

    const [isAdmin] = UseAdmin()
    const { logoutUser } = useContext(authContext)
    const [notificaion] = UseNotification()
    const location = useLocation()

    const handleLogout = () => {
        logoutUser()
            .then(result => {
                // console.log(result)
                toast.success('Logout Successfull')
            })
            .catch(error => {
                // console.log(error)
            })
    }

    return (
        <div className="lg:flex md:flex">
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            {/* dashboard side bar */}
            <div className="lg:w-64 md:w-64 lg:min-h-screen md:min-h-screen bg-[#262626]">
                <div className="flex justify-center">
                    <img className="h-10 rounded-md mt-3" src={logo} alt="" />
                </div>
                <p className="font-bold text-center text-white">Dashboard</p>
                <ul className="menu text-white">
                    {
                        isAdmin ? <>
                            <li><NavLink to="adminProfile"><MdAdminPanelSettings />Admin Profile</NavLink></li>
                            <li><NavLink to="manageUser"><HiMiniUsers />Manage Users</NavLink></li>
                            <li><NavLink to="reportedComment"><MdReport />Reported Comments</NavLink></li>
                            <li><NavLink to="makeAnnouncement"><MdAnnouncement />Make Announcement</NavLink></li>
                        </>
                            :
                            <>
                                <li><NavLink to="myprofile"><CgProfile />My Profile</NavLink></li>
                                <li><NavLink to="addpost"><MdOutlinePhoneAndroid />Add Post</NavLink></li>
                                <li><NavLink to="mypost"><BsFillPostcardFill />My Posts</NavLink></li>
                                <li><NavLink to="messageBy"><MdMessage />Message By Admin</NavLink></li>
                            </>
                    }
                    {/* shared nav links */}
                    <div className="divider"></div>
                    <li><Link to="/"> <FaHome></FaHome>Home</Link></li>
                    <li><Link to="/membership"><MdCardMembership />Membership</Link></li>
                    <li><div><IoNotifications />Notification<p>({notificaion.length})</p></div></li>
                    <li><button className="font-bold flex items-center" onClick={handleLogout}><FiLogOut />Logout</button></li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 lg:p-8 p-5 bg-[#181818]">
                {(location.pathname === "/dashboard" && isAdmin && <AdminProfile />) || (location.pathname === "/dashboard" && !isAdmin && <MyProfile />) || <Outlet></Outlet>}
            </div>
        </div>
    );
};

export default Dashboard;