import { BsFillPostcardFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { HiMiniUsers } from "react-icons/hi2";
import { IoNotifications } from "react-icons/io5";
import { MdAdminPanelSettings, MdAnnouncement, MdCardMembership, MdOutlinePhoneAndroid, MdReport } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import logo from '../assets/83a58a6b-7eb0-49f5-ac35-1a7a3bd00b00.jfif';
import UseAdmin from "../Hooks/UseAdmin";
import { Helmet } from "react-helmet-async";
import { FiLogOut } from "react-icons/fi";
import { useContext } from "react";
import { authContext } from "../Provider/Authprovider";
import UseNotification from "../Hooks/UseNotification";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const Dashboard = () => {

    const [isAdmin] = UseAdmin()
    const { logoutUser } = useContext(authContext)
    const [notificaion] = UseNotification()

    const handleLogout = () => {
        logoutUser()
            .then(result => {
                toast.success('Logout Successfull')
            })
            .catch(error => {
                // console.log(error)
            })
    }

    const axiosSecure = UseAxiosSecure()
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users', {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('access-token')}`
                }
            })
            return res.data;
        }
    })

    return (
        <div className="lg:flex md:flex">
            <Helmet>
                <title>DASHBOARD</title>
            </Helmet>
            {/* dashboard side bar */}
            <div className="lg:w-64 md:w-64 min-h-screen bg-purple-300">
                <div className="flex justify-center lg:mt-3">
                    <img className="h-10 rounded-md" src={logo} alt="" />
                </div>
                <p className="font-bold text-center">Dashboard</p>
                <ul className="menu">
                    {
                        isAdmin ? <>
                            <li><NavLink to="adminProfile"><MdAdminPanelSettings />Admin Profile</NavLink></li>
                            <li><NavLink to="manageUser"><HiMiniUsers />Manage Users<p>({users.length})</p></NavLink></li>
                            <li><NavLink to="reportedComment"><MdReport />Reported Comments</NavLink></li>
                            <li><NavLink to="makeAnnouncement"><MdAnnouncement />Make Announcement</NavLink></li>
                        </>
                            :
                            <>
                                <li><NavLink to="myprofile"><CgProfile />My Profile</NavLink></li>
                                <li><NavLink to="addpost"><MdOutlinePhoneAndroid />Add Post</NavLink></li>
                                <li><NavLink to="mypost"><BsFillPostcardFill />My Posts</NavLink></li>
                            </>
                    }
                    {/* shared nav links */}
                    <div className="divider"></div>
                    <li><NavLink to="/"> <FaHome></FaHome>Home</NavLink></li>
                    <li><NavLink to="/membership"><MdCardMembership />Membership</NavLink></li>
                    <li><div><IoNotifications />Notification<p>({notificaion.length})</p></div></li>
                    <li><button className="font-bold flex items-center" onClick={handleLogout}><FiLogOut />Logout</button></li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 lg:p-8 p-5">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;