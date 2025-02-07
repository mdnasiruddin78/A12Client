import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const AdminStep = ({ report, index }) => {

    const { comment, reaction, reportBy, reportEmail } = report;
    const handleReadMore = (text) => {
        Swal.fire({
            title: "Comment Text Details",
            text: `${text}`,
        });
    }

    return (
        <tr>
            <th className="text-white">
                {index + 1}
            </th>
            <td>
                <p className="font-bold text-blue-500">{reportBy}</p>
            </td>
            <td>
                <p className="font-bold text-red-500">{reportEmail}</p>
            </td>
            <td className="text-white">
                {comment.substring(0, 20)}<span onClick={() => handleReadMore(comment)} className="btn btn-ghost btn-xs text-blue-800">...Read More</span>
            </td>
            <th className="text-white">
                {reaction}
            </th>
            <th>
                <Link to={`/dashboard/adminstep/${reportEmail}`} className="btn btn-ghost btn-xs bg-green-600 text-white">Take Action</Link>
            </th>
        </tr>
    );
};

export default AdminStep;