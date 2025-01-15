import { IoNotifications } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import logo from '../assets/83a58a6b-7eb0-49f5-ac35-1a7a3bd00b00.jfif';
import { useContext } from "react";
import { authContext } from "../Provider/Authprovider";
import './index.css/index.css';
import { HiMenuAlt1 } from "react-icons/hi";


const Navbar = () => {
    
    const {name} = useContext(authContext)
    
    return (
        <div className="flex justify-between items-center lg:px-7 px-4 bg-purple-300">
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
                <NavLink to='/notification'><IoNotifications className='text-2xl'/></NavLink>
            </div>
            <div>
                <Link to="/login" className="btn-grad btn-grad btn-grad:hover">Join US</Link>
            </div>
        </div>
    );
};

export default Navbar;