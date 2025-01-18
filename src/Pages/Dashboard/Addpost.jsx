import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { authContext } from "../../Provider/Authprovider";
import { useForm } from "react-hook-form";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import toast from "react-hot-toast";


const Addpost = () => {

    const axiosPublic = UseAxiosPublic()
    const { user } = useContext(authContext)
    const { register, handleSubmit, reset } = useForm();
    const [tags, setTags] = useState()

    const onSubmit = data => {
        const addPost = {
            name: data.name,
            image: data.image,
            title: data.title,
            tag: tags,
            email: user.email,
            description: data.description,
        }
        console.log(addPost)
        toast.success('Post Successfully Added!')
        axiosPublic.post('/addPost', addPost)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    reset()
                    toast.success('Post Successfully Added!')
                }
            })
    }

    return (
        <div>
            <Helmet>
                <title>DASHBOARD | ADD-POST</title>
            </Helmet>
            <div className="mb-3">
                <h1 className="text-xl font-bold">Add Service:</h1>
            </div>
            <div className="card bg-white w-full rounded-xl">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    {/* form first row */}
                    <div className='flex flex-col lg:flex-row gap-5'>
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text">Author Image</span>
                            </label>
                            <input type="url" {...register("image", { required: true })} placeholder="Service Image link" className="input input-bordered" />
                        </div>
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text">Post Title</span>
                            </label>
                            <input type="text" {...register("title", { required: true })} placeholder="Service Title" className="input input-bordered" />
                        </div>
                    </div>
                    {/* form second row */}
                    <div className='flex flex-col lg:flex-row gap-5'>
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text">Author Name</span>
                            </label>
                            <input type="text" {...register("name", { required: true })} placeholder="Company Name" className="input input-bordered" />
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
                                <option value='Computer'>Computer</option>
                                <option value='Mobile'>Mobile</option>
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
                        <button className="btn rounded-full bg-gray-800 text-white">Add Service</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Addpost;