import { BsFillPostcardFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { HiMiniUsers } from "react-icons/hi2";
import { IoNotifications } from "react-icons/io5";
import { MdAdminPanelSettings, MdAnnouncement, MdCardMembership, MdOutlinePhoneAndroid, MdReport } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import logo from '../assets/83a58a6b-7eb0-49f5-ac35-1a7a3bd00b00.jfif';


const Dashboard = () => {
    return (
        <div className="lg:flex md:flex">
            {/* dashboard side bar */}
            <div className="lg:w-64 md:w-64 min-h-screen bg-purple-300">
                <div className="flex justify-center py-5">
                    <img className="h-10 rounded-md" src={logo} alt="" />
                </div>
                <ul className="menu p-4">
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
                            </>
                    }
                    {/* shared nav links */}
                    <div className="divider"></div>
                    <li><NavLink to="/"> <FaHome></FaHome>Home</NavLink></li>
                    <li><NavLink to="/membership"><MdCardMembership />Membership</NavLink></li>
                    <li><NavLink to="/notification"><IoNotifications />Notification</NavLink></li>
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