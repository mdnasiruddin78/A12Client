import { format } from "date-fns";
import './index/index.css';

const ContentCard = ({ content }) => {
    const { name, image, date, title, description } = content;
    return (
        <div className="p-3 rounded-xl adminColor shadow-lg">
            <div className="flex items-center mb-4">
                <img
                    src={image}
                    alt="Profile"
                    className="w-12 h-12 rounded-full border-2 border-blue-500"
                />
                <div className="ml-4">
                    <h2 className="font-semibold text-lg text-white">{name}</h2>
                    <p className="text-gray-500 text-sm">Date: {date && format(new Date(date), 'P')}</p>
                </div>
            </div>
            <p>Title: {title}</p>
            <p className="break-all">Description: {description}</p>
        </div>
    );
};

export default ContentCard;