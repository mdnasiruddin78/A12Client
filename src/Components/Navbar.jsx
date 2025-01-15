import { IoNotifications } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import logo from '../assets/83a58a6b-7eb0-49f5-ac35-1a7a3bd00b00.jfif';
import { useContext } from "react";
import { authContext } from "../Provider/Authprovider";
import './index.css/index.css';
import { HiMenuAlt1 } from "react-icons/hi";


const Navbar = () => {

    const { user,logoutUser } = useContext(authContext)

    const handleLogout = () => {
        logoutUser()
        .then(result => {
            // console.log(result)
        })
        .catch(error => {
            // console.log(error)
        })
    }

    return (
        <div className="flex justify-between items-center lg:px-7 px-4 py-2 bg-purple-300">
            <div className="hidden lg:flex md:flex">
                <Link to="/"><img className="h-10 rounded-md" src={logo} alt="" /></Link>
            </div>
            <div className="dropdown lg:hidden md:hidden flex">
                <div tabIndex={0} role="button"><HiMenuAlt1 className='text-3xl text-black' /></div>
                <ul tabIndex={0} className="dropdown-content menu text-black bg-base-200 font-bold rounded-box z-[1] w-44 p-2">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/membership">Membership</NavLink></li>
                </ul>
            </div>
            <div className="flex items-center space-x-5">
                <NavLink to='/' className='font-bold lg:flex md:flex hidden'>Home</NavLink>
                <NavLink to='/membership' className='font-bold lg:flex md:flex hidden'>Membership</NavLink>
                <NavLink to='/notification'><IoNotifications className='text-2xl' /></NavLink>
            </div>
            <div>
                {
                    user && user?.email ? <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button"><img className="w-12 rounded-full" src={user?.photoURL} alt="not found" /></div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-[1] w-52 p-2 shadow">
                            <li><h3 className="font-bold">{user?.displayName}</h3></li>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><a><button className="font-bold" onClick={handleLogout}>Logout</button></a></li>
                        </ul>
                    </div>
                        :
                        <Link to="/login" className="btn bg-purple-700 rounded-md text-white">Join US</Link>
                }
            </div>
        </div>
    );
};

export default Navbar;



