import { useForm } from "react-hook-form";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const MakeAnnounce = () => {

    const axiosSecure = UseAxiosSecure();
    const axiosPublic = UseAxiosPublic()
    const { register, handleSubmit, reset } = useForm();
    const [startDate, setStartDate] = useState(new Date());

    const onSubmit = async data => {
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            },
        })
        if (res.data.success) {
            const announcement = {
                name: data.name,
                image: res.data.data.display_url,
                date: startDate,
                title: data.title,
                description: data.description,
            }
            axiosSecure.post('/announcement', announcement)
                .then(res => {
                    // console.log(res.data)
                    if (res.data.insertedId) {
                        reset()
                        toast.success('Announcement Sent Successfull')
                    }
                })
        }
    }

    return (
        <div>
            <Helmet>
                <title>Dashboard | Make-Announcement</title>
            </Helmet>
            <h3 className="text-xl font-bold text-white">Make Announcement:</h3>
            <div className="mt-10">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div>
                        <p className="text-white">Author Name:</p>
                        <input {...register("name", { required: true })}
                            type="text"
                            placeholder="Type Your Name"
                            className='block lg:w-1/2 w-full px-4 py-2 text-white bg-[#262626] border border-white rounded-lg focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                        />
                    </div>
                    <div>
                        <p className="text-white">Author Image:</p>
                        <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                    </div>
                    <div>
                        <p className="text-white">Date:</p>
                        <DatePicker
                            className='border p-2 rounded-md text-white bg-[#262626] border-white'
                            selected={startDate}
                            onChange={(date) => setStartDate(date)} />
                    </div>
                    <div>
                        <p className="text-white">Title:</p>
                        <input {...register("title", { required: true })}
                            type="text"
                            placeholder="title"
                            className='block lg:w-1/2 w-full px-4 py-2 text-white bg-[#262626] border border-white rounded-lg focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                        />
                    </div>
                    <div>
                        <p className="text-white">Description:</p>
                        <textarea {...register("description", { required: true })}
                            type="text"
                            placeholder="Description"
                            className='block lg:w-1/2 w-full px-4 py-2 text-white bg-[#262626] border border-white rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                        />
                    </div>
                    <button className="btn bg-blue-700 border-none text-white">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default MakeAnnounce;