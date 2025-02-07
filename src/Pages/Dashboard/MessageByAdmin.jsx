import { useContext } from "react";
import { authContext } from "../../Provider/Authprovider";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import AdminMessage from "../../Components/AdminMessage";
import { Helmet } from "react-helmet-async";


const MessageByAdmin = () => {

    const { user } = useContext(authContext)
    const axiosSecure = UseAxiosSecure()

    const { data: getData = [] } = useQuery({
        queryKey: ['getData'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/message/${user?.email}`)
            return res.data
        }
    })
    // console.log(getData)
    return (
        <div>
            <Helmet>
                <title>Dashboard | Admin-Message</title>
            </Helmet>
            <h3 className="text-xl font-bold mb-3 text-white">Message By Admin:</h3>
            <div className="grid grid-cols-1 gap-4">
                {
                    getData.map(data => <AdminMessage key={data._id} data={data}></AdminMessage>)
                }
            </div>
        </div>
    );
};

export default MessageByAdmin;