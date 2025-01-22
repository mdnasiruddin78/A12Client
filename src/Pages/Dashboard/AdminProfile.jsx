import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { authContext } from "../../Provider/Authprovider";
import { useForm } from "react-hook-form";
import '../../Components/index/index.css';
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import { FaUsers } from "react-icons/fa";
import { BsFillPostcardFill } from "react-icons/bs";
import { PieChart } from 'react-minimal-pie-chart';


const AdminProfile = () => {

    const { user } = useContext(authContext)
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = UseAxiosSecure()
    const axiosPublic = UseAxiosPublic()

    const onSubmit = data => {
        const tagName = {
            tag: data.tag,
        }
        console.log(tagName)
        axiosSecure.post('/addTags', tagName)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    reset()
                    toast.success('Tag Added Successfully!')
                }
            })
    }

    const { data: recivedData = [] } = useQuery({
        queryKey: ['recivedData'],
        queryFn: async () => {
            const res = await axiosPublic.get('/addPost')
            return res.data
        }
    })

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data;
        }
    })
    console.log(users)
    console.log(recivedData)
    return (
        <div>
            <Helmet>
                <title>Dashboard | Admin-Profile</title>
            </Helmet>
            <h3 className="text-xl font-bold">Admin Profile:</h3>
            <div className="flex items-center space-x-4">
                <div>
                    <img className="w-32 h-32 rounded-full" src={user?.photoURL} alt="" />
                </div>
                <div>
                    <p className="">Name: {user?.displayName}</p>
                    <p className="">Email: {user?.email}</p>
                </div>
            </div>
            <div className="flex space-x-4 py-4">
                <div className="flex items-center space-x-3 text-3xl">
                    <div>
                        <h3>Total-Users</h3>
                    </div>
                    <div className="flex items-center space-x-3">
                        <FaUsers />
                        <p>{users.length}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-3 text-3xl">
                    <div>
                        <h3>Total-Posts</h3>
                    </div>
                    <div className="flex items-center space-x-3">
                        <BsFillPostcardFill className="text-xl" />
                        <p>{recivedData.length}</p>
                    </div>
                </div>
            </div>
            <h3 className="text-xl font-bold">pie chart:</h3>
            <PieChart
                className="w-72"
                data={[
                    { title: 'number or post', value: `${recivedData.length}`, color: '#E38627' },
                    { title: 'Two', value: `${users.length}`, color: '#C13C37' },
                    { title: 'Three', value: 50, color: '#6A2135' },
                ]}
            />
            <h3 className="text-xl font-bold">Add Tags:</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                <div>
                    <p>Tag Name:</p>
                    <input {...register("tag", { required: true })}
                        type="text"
                        placeholder="enter a tag name"
                        className='block lg:w-1/2 w-full px-4 py-2 text-gray-700 bg-white border border-black rounded-lg focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                    />
                </div>
                <button className="btn adminColor">Submit</button>
            </form>
        </div>
    );
};

export default AdminProfile;