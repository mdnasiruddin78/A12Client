import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { MdAdminPanelSettings } from "react-icons/md";
import toast from "react-hot-toast";


const ManageUser = () => {

    const axiosSecure = UseAxiosSecure()
    const { data: users = [] ,refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data;
        }
    })

    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res => {
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                refetch()
                toast.success(`${user.name} is an Admin Now!`)
            }
        })
    }

    return (
        <div>
            <div className="flex justify-around">
                <h3 className="text-xl font-semibold">All Users</h3>
                <h3 className="text-xl font-semibold">Total Users: {users.length}</h3>
            </div>
            <div className="divider"></div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>User Name</th>
                            <th>User email</th>
                            <th>Make admin</th>
                            <th>Subscription Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="font-bold">{user?.name}</div>
                                    </div>
                                </td>
                                <td>
                                    {user?.email}
                                </td>
                                <td>
                                   {
                                        user.role === 'admin' ?  <button className="btn btn-ghost btn-xs bg-green-500">Admin</button>
                                        :  
                                        <button onClick={()=>handleMakeAdmin(user)} className="btn btn-ghost btn-xs bg-sky-500"><MdAdminPanelSettings className="text-2xl" /></button>
                                   }
                                </td>
                                <th>
                                    <button className="btn btn-ghost btn-xs">details</button>
                                </th>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUser;