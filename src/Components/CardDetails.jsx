import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";
import {
    FacebookShareButton,
} from "react-share";

import {
    FacebookIcon,
} from "react-share";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { authContext } from "../Provider/Authprovider";
import toast from "react-hot-toast";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";


const CardDetails = () => {

    const { id } = useParams()
    const { user } = useContext(authContext)
    const axiosPublic = UseAxiosPublic()
    const shareUrl = 'https://www.facebook.com/profile.php'
    const { register, handleSubmit, reset } = useForm();

    const { data: details = [], refetch } = useQuery({
        queryKey: ['details'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/addPost/${id}`)
            return res.data;
        }
    })

    const { _id, description, image, name, tag, title, time } = details;

    function timeAgo(date) {
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);
        const diffInMonths = Math.floor(diffInDays / 30);
        const diffInYears = Math.floor(diffInDays / 365);

        if (diffInSeconds < 60) {
            return `${diffInSeconds} seconds ago`;
        } else if (diffInMinutes < 60) {
            return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
        } else if (diffInHours < 24) {
            return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
        } else if (diffInDays < 30) {
            return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
        } else if (diffInMonths < 12) {
            return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`;
        } else {
            return `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`;
        }
    }

    // const oldDate = new Date("Mon Jan 01 1990 00:00:00 GMT+0600 (Bangladesh Standard Time)");
    const newDate = new Date(time);

    const onSubmit = data => {
        const commentInfo = {
            email: user.email,
            title: details.title,
            description: data.description,
            postId: details._id,
        }
        console.log(commentInfo)
        axiosPublic.post('/allComment', commentInfo)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    reset()
                    toast.success('Comment Successfully!')
                }
            })
    }

    const handleUpvote = details => {
        const newVote = details.vote + 1
        const voteInfo = {
            vote: newVote,
        }
        axiosPublic.patch(`/voteCount/${details._id}`, voteInfo)
            .then(res => {
                console.log(res.data)
                refetch()
            })
    }

    const handleDowneVote = details => {
        const newVote = details.vote - 1
        const voteInfo = {
            vote: newVote,
        }
        axiosPublic.patch(`/voteCount/${details._id}`, voteInfo)
            .then(res => {
                console.log(res.data)
                refetch()
            })
    }

    return (
        <div className="bg-base-300 min-h-screen p-5">
            <Helmet>
                <title>BlogSpace | Post-Details</title>
            </Helmet>
            <h3 className="text-xl text-center">Post Deatals</h3>
            <div className="flex justify-center">
                <div className="w-[550px] p-5 bg-white shadow-lg rounded-lg">
                    <div className="flex items-center mb-4">
                        <img
                            src={image}
                            alt="Profile"
                            className="w-12 h-12 rounded-full"
                        />
                        <div className="ml-4">
                            <h2 className="font-semibold text-lg text-gray-800">{name}</h2>
                            <p className="text-gray-500 text-sm">{tag} • {timeAgo(newDate)}</p>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                        {title}
                    </h3>
                    <p className="text-gray-600 break-all">
                        {description}
                    </p>
                    <div className="flex items-center justify-between mt-4 text-gray-500">
                        <div className="flex items-center space-x-2">
                            <span className="flex items-center">
                                <button onClick={() => handleUpvote(details)} className="btn btn-xs"><FaArrowUp />Upvote</button> • 
                                <p className="text-xl font-bold text-green-500">{details?.vote}</p>
                            </span>
                            <span className="flex items-center">
                                <button disabled={details.vote < 1} onClick={() => handleDowneVote(details)} className="btn btn-xs"><FaArrowDown />Downvote</button>
                            </span>
                        </div>
                        <FacebookShareButton url={shareUrl}>
                            <FacebookIcon size={32} round />
                        </FacebookShareButton>
                    </div>
                </div>
            </div>
            <h3 className="text-xl text-center mt-5">Comment Section</h3>
            <div className="flex justify-center">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div>
                        <p>Description:</p>
                        <textarea {...register("description", { required: true })}
                            type="text"
                            placeholder="Description"
                            className='px-4 py-2 w-80 border-2 border-black rounded-md text-gray-700'
                        />
                    </div>
                    <div className="flex justify-center">
                    <button className="btn adminColor">Comment</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CardDetails;