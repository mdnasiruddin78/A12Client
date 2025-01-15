import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";


const Mainlayout = () => {
    return (
        <div>
            <nav className='sticky top-0 z-50'>
                <Navbar></Navbar>
            </nav>
            <section>
                <Outlet></Outlet>
            </section>
        </div>
    );
};

export default Mainlayout;