import { IoNotifications } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import logo from '../assets/83a58a6b-7eb0-49f5-ac35-1a7a3bd00b00.jfif';
import { useContext } from "react";
import { authContext } from "../Provider/Authprovider";
import './index.css/index.css';


const Navbar = () => {
    
    const {name} = useContext(authContext)
    
    return (
        <div className="flex justify-between items-center px-7 bg-purple-300">
            <div>
                <Link to="/"><img className="h-10 rounded-md" src={logo} alt="" /></Link>
            </div>
            <div className="flex items-center space-x-5">
                <NavLink to='/' className='font-bold'>Home</NavLink>
                <NavLink to='/membership' className='font-bold'>Membership</NavLink>
                <NavLink to='/notification'><IoNotifications className='text-2xl'/></NavLink>
            </div>
            <div>
                <Link to="/login" className="btn-grad btn-grad btn-grad:hover">Join US</Link>
            </div>
        </div>
    );
};

export default Navbar;