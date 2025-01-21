import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { authContext } from "../../Provider/Authprovider";
import { useForm } from "react-hook-form";
import '../../Components/index/index.css';
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import toast from "react-hot-toast";


const AdminProfile = () => {

    const { user } = useContext(authContext)
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = UseAxiosSecure()

    const onSubmit = data => {
        const tagName = {
            tag: data.tag,
        }
        console.log(tagName)
        axiosSecure.post('/addTags',tagName)
        .then(res => {
            console.log(res.data)
            if (res.data.insertedId) {
                reset()
                toast.success('Tag Added Successfully!')
            }
        })
    }

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