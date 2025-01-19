import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "./UseAxiosSecure";


const UseNotification = () => {

    const axiosSecure = UseAxiosSecure()

    const {data: notification = [],isLoading} = useQuery({
        queryKey: ['notificaion'],
        queryFn: async () => {
           const res = await axiosSecure.get('/announcement')
           return res.data
        }
    }) 

    return [notification,isLoading]
};

export default UseNotification;