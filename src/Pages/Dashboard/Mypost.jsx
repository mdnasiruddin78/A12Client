import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { authContext } from "../../Provider/Authprovider";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaCommentDots } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


const Mypost = () => {

    const { user } = useContext(authContext)
    const axiosSecure = UseAxiosSecure()
    const { data: myPosts = [], refetch } = useQuery({
        queryKey: ['myPosts'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/addEmail/${user?.email}`)
            // console.log(res.data)
            return res.data
        }
    })

    const handleDeleteUser = (myPost) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You want to delete this post ${myPost?.title}!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/addEmail/${myPost?._id}`)
                    .then(res => {
                        // console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: `${myPost?.title} has been deleted.`,
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
                <title>Dashboard | My-Post</title>
            </Helmet>
            <h3 className="text-xl font-bold">My Posts:</h3>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead >
                        <tr>
                            <th>Serial</th>
                            <th>Post Title</th>
                            <th>Number of votes</th>
                            <th>Comment</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myPosts.map((myPost, index) => <tr key={myPost._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    {myPost.title}
                                </td>
                                <td>
                                    {myPost?.vote?.length}
                                </td>
                                <td>
                                    <Link to={`/dashboard/comment/${myPost._id}`} className="btn btn-ghost btn-xs"><FaCommentDots className="text-2xl text-blue-600" /></Link>
                                </td>
                                <th>
                                    <button onClick={() => handleDeleteUser(myPost)} className="btn btn-ghost btn-xs"><RiDeleteBin5Line className="text-2xl text-red-600" /></button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Mypost;