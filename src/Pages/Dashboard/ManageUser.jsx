import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { MdAdminPanelSettings } from "react-icons/md";
import { Helmet } from "react-helmet-async";
import { RiDeleteBin5Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { useState } from "react";


const ManageUser = () => {

    const axiosSecure = UseAxiosSecure()
    const [search, setSearch] = useState('')

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users', search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?search=${search}`, {
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
                        // console.log(res.data)
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
                        // console.log(res.data)
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
                <title>Dashboard | Manage-Users</title>
            </Helmet>
            <div className="flex justify-around">
                <h3 className="text-xl font-semibold text-white">All Users</h3>
                <h3 className="text-xl font-semibold text-white">Total Users: {users.length}</h3>
            </div>
            <div className="divider"></div>
            <div className="flex justify-end">
                <input
                    className='input input-bordered w-full max-w-xs text-white border-gray-500 bg-[#202020] focus:border-white'
                    type='text'
                    name='search'
                    onChange={e => setSearch(e.target.value)}
                    value={search}
                    placeholder='Enter A Email'
                    aria-label='Enter A Email'
                />
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-white">
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
                                <th className="text-white">
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="font-semibold text-white">{user?.name}</div>
                                    </div>
                                </td>
                                <td className="font-semibold text-white">
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
                                    <div>
                                        {user && user?.status === 'member' ? <button className="bg-black text-white btn btn-ghost btn-xs">Member</button> : <button className="bg-gray-500 btn btn-ghost btn-xs">No</button>}
                                    </div>
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