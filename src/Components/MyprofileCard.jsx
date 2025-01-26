import {
    FacebookShareButton,
} from "react-share";

import {
    FacebookIcon,
} from "react-share";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const MyprofileCard = ({ myPost }) => {

    const axiosSecure = UseAxiosSecure()
    const { _id, description, image, name, tag, title, time, vote,commentCount } = myPost;
    const shareUrl = 'https://www.facebook.com/profile.php'

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

    // const { data: comments = [] } = useQuery({
    //     queryKey: ['comments'],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/allComment/${_id}`)
    //         return res.data;
    //     }
    // })

    return (
        <div className="">
            <div className="lg:w-[550px] p-5 bg-white shadow-lg rounded-lg">
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
                            <span className="ml-1 text-green-500">Vote Count • {vote}</span>
                        </span>
                        <span className="flex items-center">
                            <span className="ml-1 text-blue-500">Comment • {commentCount || 0}</span>
                        </span>
                    </div>
                    <FacebookShareButton url={shareUrl}>
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>
                </div>
            </div>
        </div>
    );
};

export default MyprofileCard;