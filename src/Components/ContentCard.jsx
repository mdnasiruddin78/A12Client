import { format } from "date-fns";

const ContentCard = ({content}) => {
    const {name,image,date,title,description} = content;
    return (
        <div className="lg:font-semibold p-3 rounded-xl bg-purple-200 shadow-lg">
            <p className="text-center">Date: {date && format(new Date(date), 'P')}</p>
            <div className="flex justify-center">
                <img className="w-40 rounded-xl" src={image} alt="" />
            </div>
            <h3>Name: {name}</h3>
            <p>Title: {title}</p>
            <p className="break-all">Description: {description}</p>
        </div>
    );
};

export default ContentCard;