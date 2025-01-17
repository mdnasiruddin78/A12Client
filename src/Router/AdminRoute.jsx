import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authContext } from "../Provider/Authprovider";
import UseAdmin from "../Hooks/UseAdmin";
import Loading from "../Components/Loading";


const AdminRoute = ({children}) => {

    const { user, loading } = useContext(authContext);
    const [isAdmin, isAdminLoading] = UseAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <Loading></Loading>
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>

};

export default AdminRoute;