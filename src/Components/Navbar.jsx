import { IoNotifications } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import logo from '../assets/83a58a6b-7eb0-49f5-ac35-1a7a3bd00b00.jfif';
import { useContext } from "react";
import { authContext } from "../Provider/Authprovider";
import { HiMenuAlt1 } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import toast from "react-hot-toast";
import UseNotification from "../Hooks/UseNotification";
import { Badge } from "@material-tailwind/react";
import './index/index.css';


const Navbar = () => {

    const { user, logoutUser } = useContext(authContext)
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

    return (
        <div className="flex justify-between items-center backdrop-blur lg:px-7 px-4 py-2">
            <div className="dropdown lg:hidden md:hidden flex">
                <div tabIndex={0} role="button"><HiMenuAlt1 className='text-3xl text-black' /></div>
                <ul tabIndex={0} className="dropdown-content menu text-black bg-base-200 font-bold rounded-box z-[1] w-44 p-2">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/membership">Membership</NavLink></li>
                </ul>
            </div>
            <div className="flex items-center lg:gap-10 md:gap-10">
                <Link to="/"><img className="h-10 rounded-md hidden lg:flex md:flex" src={logo} alt="" /></Link>
                <div className="flex items-center space-x-5">
                    <NavLink to='/' className='font-bold lg:flex md:flex hidden'>Home</NavLink>
                    <NavLink to='/membership' className='font-bold lg:flex md:flex hidden'>Membership</NavLink>
                </div>
            </div>
            <div>
                {
                    user && user?.email ? <div className="flex items-center space-x-5">
                        <Badge content={`${notificaion.length}`} withBorder>
                            <IoNotifications className="text-2xl" />
                        </Badge>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button"><img className="w-12 h-12 rounded-full border-2 border-blue-500" src={user?.photoURL} alt="not found" /></div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-[1] w-52 p-2 shadow">
                                <li><h3 className="font-bold">{user?.displayName}</h3></li>
                                <li>
                                    <Link to="/dashboard">Dashboard</Link>
                                </li>
                                <li><a><button className="font-bold flex items-center" onClick={handleLogout}><FiLogOut className="mr-2" />Logout</button></a></li>
                            </ul>
                        </div></div>
                        :
                        <div className="flex items-center space-x-5">
                            <Badge content={`${notificaion.length}`} withBorder>
                                <IoNotifications className="text-2xl" />
                            </Badge>
                            <Link to="/login" className="btn adminColor rounded-md">Join US</Link>
                        </div>
                }
            </div>
        </div>
    );
};

export default Navbar;



