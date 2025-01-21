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
            <h3 className="text-xl font-bold mb-3">Admin Profile:</h3>
            <div className="flex items-center space-x-4">
                <div>
                    <img className="w-32 h-32 rounded-full" src={user?.photoURL} alt="" />
                </div>
                <div>
                    <p className="">Name: {user?.displayName}</p>
                    <p className="">Email: {user?.email}</p>
                </div>
            </div>
            <div className="flex space-x-4">
                <div className="flex items-center space-x-3 text-2xl">
                    <FaUsers />
                    <p>{users.length}</p>
                </div>
                <div className="flex items-center space-x-3 text-2xl">
                    <BsFillPostcardFill className="text-xl" />
                    <p>{recivedData.length}</p>
                </div>
                {/* <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
                    <div
                        className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-blue-600 to-blue-400 text-white shadow-blue-500/40`}
                    >
                        <BsFillCartPlusFill className='w-6 h-6 text-white' />
                    </div>
                    <div className='p-4 text-right'>
                        <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
                            Total Orders
                        </p>
                        <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
                            120
                        </h4>
                    </div>
                </div> */}
            </div>
            <h3 className="text-xl font-bold py-3">Add Tags:</h3>
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