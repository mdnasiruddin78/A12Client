import { useContext, useState } from "react";
import { authContext } from "../Provider/Authprovider";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";
import toast from "react-hot-toast";


const Privateroute = ({ children }) => {

    const { user, loading } = useContext(authContext)
    const location = useLocation()

    if (loading) {
        return <Loading></Loading>
    }

    if (user && user?.email) {
        return children;
    }

    if (!user) {
        toast.error('Please Login')
    }

    return <Navigate state={location.pathname} to={'/'}></Navigate>
};

export default Privateroute;