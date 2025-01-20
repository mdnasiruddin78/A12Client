import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../Provider/Authprovider";

export const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_KEY
})

const UseAxiosSecure = () => {

    const navigate = useNavigate()
    const { logoutUser } = useContext(authContext)

    // request interceptor 
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        // console.log('request stopped by interceptors', token)
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        return Promise.reject(error);
    });


    // intercepts 401 and 403 status
    useEffect(() => {
        axiosSecure.interceptors.response.use(function (response) {
            return response;
        }, async (error) => {
            const status = error.response.status;
            if (status === 401 || status === 403) {
                await logoutUser();
                navigate('/login');
            }
            return Promise.reject(error);
        })
    }, [])


    return axiosSecure;
};

export default UseAxiosSecure;