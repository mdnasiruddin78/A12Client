import { useForm } from "react-hook-form";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../../Components/index/index.css';


const MakeAnnounce = () => {

    const axiosSecure = UseAxiosSecure()
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate()
    const [startDate, setStartDate] = useState(new Date());

    const onSubmit = data => {
        console.log(data)
        const announcement = {
            name: data.name,
            image: data.image,
            date: startDate,
            title: data.title,
            description: data.description,
        }
        axiosSecure.post('/announcement', announcement)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    reset()
                    toast.success('Announcement Sent Successfull')
                    navigate('/')
                }
            })
    }

    return (
        <div>
            <Helmet>
                <title>Dashboard | Make-Announcement</title>
            </Helmet>
            <h3 className="text-xl font-bold">Make Announcement:</h3>
            <div className="mt-10">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div>
                        <p>Name:</p>
                        <input {...register("name", { required: true })}
                            type="text"
                            placeholder="Type Your Name"
                            className='block lg:w-1/2 w-full px-4 py-2 text-gray-700 bg-white border border-black rounded-lg focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                        />
                    </div>
                    <div>
                        <p>Image:</p>
                        <input {...register("image", { required: true })}
                            type="url"
                            placeholder="image link"
                            className='block lg:w-1/2 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg border-black   focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                        />
                    </div>
                    <div>
                        <p>Date:</p>
                        <DatePicker
                            className='border p-2 rounded-md border-black'
                            selected={startDate}
                            onChange={(date) => setStartDate(date)} />
                    </div>
                    <div>
                        <p>Title:</p>
                        <input {...register("title", { required: true })}
                            type="text"
                            placeholder="title"
                            className='block lg:w-1/2 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  border-black  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                        />
                    </div>
                    <div>
                        <p>Description:</p>
                        <textarea {...register("description", { required: true })}
                            type="text"
                            placeholder="Description"
                            className='block lg:w-1/2 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  border-black  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                        />
                    </div>
                    <button className="btn adminColor">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default MakeAnnounce;