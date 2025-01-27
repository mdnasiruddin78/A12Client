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
            <th>
                {index + 1}
            </th>
            <td>
                <p className="font-bold">{reportBy}</p>
            </td>
            <td>
                <p className="font-bold">{reportEmail}</p>
            </td>
            <td>
                {comment.substring(0, 20)}<span onClick={() => handleReadMore(comment)} className="btn btn-ghost btn-xs text-blue-800">...Read More</span>
            </td>
            <th>
                {reaction}
            </th>
            <th>
                <button className="btn btn-ghost btn-xs bg-green-600 text-white">Take Action</button>
            </th>
        </tr>
    );
};

export default AdminStep;