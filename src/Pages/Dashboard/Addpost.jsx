import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { authContext } from "../../Provider/Authprovider";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Addpost = () => {

    const axiosSecure = UseAxiosSecure()
    const axiosPublic = UseAxiosPublic()
    const { user } = useContext(authContext)
    const { register, handleSubmit, reset } = useForm();
    const [tags, setTags] = useState()
    const navigate = useNavigate()

    const onSubmit = async data => {
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            },
        })
        // console.log(res.data)
        if (res.data.success) {
            const addPost = {
                name: data.name,
                image: res.data.data.display_url,
                title: data.title,
                tag: tags,
                email: user.email,
                description: data.description,
                time: Date(),
                vote: [],
            }
            // console.log(addPost)
            axiosSecure.post('/addPost', addPost)
                .then(res => {
                    // console.log(res.data)
                    if (res.data.insertedId) {
                        reset()
                        toast.success('Post Successfully Added!')
                        navigate('/dashboard/mypost')
                    }
                })
        }
    }

    const { data: allTag = [] } = useQuery({
        queryKey: ['tags'],
        queryFn: async () => {
            const res = await axiosSecure.get('/addTags')
            return res.data
        }
    })

    // post length 
    const { data: myPosts = [] } = useQuery({
        queryKey: ['myPosts'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/addEmail/${user?.email}`)
            // console.log(res.data)
            return res.data
        }
    })

    // memberShip
    const { data: memberShip = [] } = useQuery({
        queryKey: ['memberShip'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}`)
            // console.log(res.data)
            return res.data
        }
    })
    // console.log(memberShip)
    return (
        <div>
            <Helmet>
                <title>Dashboard | Add-Post</title>
            </Helmet>
            <div className="mb-3">
                <h1 className="text-xl font-bold text-white">Add Service:</h1>
            </div>
            <div>
                {
                    !memberShip?.[0]?.status && myPosts.length > 5 ? <Link to="/membership" className="btn bg-blue-700 border-none text-white">Become a Member</Link> : <div className="card bg-white w-full rounded-xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body rounded-md">
                            {/* form first row */}
                            <div className='flex flex-col lg:flex-row gap-5'>
                                <div className="form-control flex-1">
                                    <label className="label">
                                        <span className="label-text">Post Title</span>
                                    </label>
                                    <input type="text" {...register("title", { required: true })} placeholder="Title" className="input input-bordered" />
                                </div>
                                <div className="form-control flex-1">
                                    <label className="label">
                                        <span className="label-text">Author Image</span>
                                    </label>
                                    <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                                </div>
                            </div>
                            {/* form second row */}
                            <div className='flex flex-col lg:flex-row gap-5'>
                                <div className="form-control flex-1">
                                    <label className="label">
                                        <span className="label-text">Author Name</span>
                                    </label>
                                    <input type="text" {...register("name", { required: true })} placeholder="Author Name" className="input input-bordered" />
                                </div>
                                <div className="form-control flex-1">
                                    <label className="label">
                                        <span className="label-text">Tag</span>
                                    </label>
                                    <select
                                        className="select select-bordered"
                                        onChange={e => setTags(e.target.value)}
                                        value={tags}
                                        required
                                    >
                                        <option defaultValue>Select A Tag!</option>
                                        {
                                            allTag.map(tag => <option key={tag._id} value={tag.tag}>{tag?.tag}</option>)
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='flex flex-col lg:flex-row gap-5'>
                                <div className="form-control flex-1">
                                    <label className="label">
                                        <span className="label-text">Author Email</span>
                                    </label>
                                    <input type="email"
                                        readOnly
                                        defaultValue={user?.email}
                                        className="input input-bordered" />
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Post Description</span>
                                </label>
                                <textarea {...register("description", { required: true })} className="textarea textarea-bordered" placeholder="Description" required></textarea>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn rounded-full bg-gray-800 text-white">Add Post</button>
                            </div>
                        </form>
                    </div>
                }
            </div>
        </div>
    );
};

export default Addpost;