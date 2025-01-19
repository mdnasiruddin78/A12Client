import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { MdAdminPanelSettings } from "react-icons/md";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { RiDeleteBin5Line } from "react-icons/ri";
import Swal from "sweetalert2";


const ManageUser = () => {

    const axiosSecure = UseAxiosSecure()
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users', {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('access-token')}`
                }
            })
            return res.data;
        }
    })

    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You want to Make Admin ${user?.name}!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes,Make Admin!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${user._id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.modifiedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Success!",
                                text: `${user?.name} is Admin Now!`,
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    const handleDeleteUser = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You want to delete ${user?.name}!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user?._id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: `${user?.name} has been deleted.`,
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div>
            <Helmet>
                <title>MANAGE-USERS</title>
            </Helmet>
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
                            <th>Membership</th>
                            <th>Delete</th>
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
                                        <div className="font-semibold">{user?.name}</div>
                                    </div>
                                </td>
                                <td className="font-semibold">
                                    {user?.email}
                                </td>
                                <td>
                                    {
                                        user.role === 'admin' ? <button className="btn btn-ghost btn-xs bg-green-500">Admin</button>
                                            :
                                            <button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost btn-xs bg-blue-600"><MdAdminPanelSettings className="text-2xl" /></button>
                                    }
                                </td>
                                <th>
                                    <button className="btn btn-ghost btn-xs">details</button>
                                </th>
                                <th>
                                    <button onClick={() => handleDeleteUser(user)} className="btn btn-ghost btn-xs"><RiDeleteBin5Line className="text-2xl text-red-600" /></button>
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