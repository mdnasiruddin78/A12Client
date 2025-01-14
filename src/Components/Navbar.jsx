import { IoNotifications } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import logo from '../assets/83a58a6b-7eb0-49f5-ac35-1a7a3bd00b00.jfif';
import { useContext } from "react";
import { authContext } from "../Provider/Authprovider";

const Navbar = () => {
    
    const {name} = useContext(authContext)
    
    return (
        <div className="flex justify-between items-center p-3">
            <div>
                <img className="h-10 rounded-md" src={logo} alt="" />
            </div>
            <div className="flex items-center space-x-5">
                <NavLink to='/' className='font-bold'>Home</NavLink>
                <NavLink to='/membership' className='font-bold'>Membership</NavLink>
                <NavLink to=''><IoNotifications className='text-2xl'/></NavLink>
            </div>
            <div>
                <Link to="/login" className="btn bg-lime-600">Join US</Link>
            </div>
        </div>
    );
};

export default Navbar;