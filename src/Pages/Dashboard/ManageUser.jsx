import { QueryClient, useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";


const ManageUser = () => {

    const axiosSecure = UseAxiosSecure()
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data;
        }
    })

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
                            users.map((user,index) => <tr key={user._id}>
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
                                <td><button className="btn btn-ghost btn-xs">Admin</button></td>
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