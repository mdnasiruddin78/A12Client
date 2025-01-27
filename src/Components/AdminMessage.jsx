import { format } from "date-fns";
import { MdOutlineError } from "react-icons/md";


const AdminMessage = ({ data }) => {
    const { date, description, title, reportText } = data
    return (
        <div className="p-4 rounded-xl bg-white shadow-lg">
            <div className="flex items-center space-x-3 mb-3">
                <MdOutlineError className="text-3xl text-red-600" />
                <p className="text-gray-500 text-sm">Date: {date && format(new Date(date), 'P')}</p>
            </div>
            <p className="border-2 bg-red-100 border-red-400 rounded-md text-center p-4">Your Comment: {reportText}</p>
            <p className="font-semibold">Title: {title}</p>
            <p className="break-all">Description: {description}</p>
        </div>
    );
};

export default AdminMessage;