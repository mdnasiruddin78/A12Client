import {
    FacebookShareButton,
} from "react-share";

import {
    FacebookIcon,
} from "react-share";


const MyprofileCard = ({ myPost }) => {

    const { _id, description, image, name, tag, title, time } = myPost;
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
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5 text-gray-400"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.5 10.5h-.75m-3.5 0h-.75m5.25 0a2.25 2.25 0 01-2.25 2.25m-3.5 0a2.25 2.25 0 01-2.25-2.25m5.25 0a2.25 2.25 0 01-2.25 2.25m5.25 0a2.25 2.25 0 01-2.25-2.25m0 0V9.75a2.25 2.25 0 112.25 2.25M2.25 15.75a4.5 4.5 0 114.5 4.5m-4.5 0a4.5 4.5 0 114.5 4.5"
                                />
                            </svg>
                            <span className="ml-1">6.3k</span>
                        </span>
                        <span className="flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5 text-gray-400"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 6.75V18m0 0h3.75m-3.75 0H8.25"
                                />
                            </svg>
                            <span className="ml-1">116</span>
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