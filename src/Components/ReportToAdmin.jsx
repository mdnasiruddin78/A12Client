import { useContext, useState } from "react";
import Swal from "sweetalert2";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { authContext } from "../Provider/Authprovider";
import toast from "react-hot-toast";


const ReportToAdmin = ({ comment,index,refetch}) => {

    const { _id, email, description } = comment
    const [feedback, setFeedback] = useState()
    const axiosSecure = UseAxiosSecure()
    const { user } = useContext(authContext)

    const handleReadMore = (text) => {
        Swal.fire({
            title: "Comment Text Details",
            text: `${text}`,
        });
    }

    const handleFeedback = (feedback) => {
        const report = {
            reaction: feedback,
            reportBy: user?.email,
            reportEmail: email,
            comment: description,
        }
        // console.log(report)
        axiosSecure.post('/feedback', report)
            .then(res => {
                // console.log(res.data)
                if (res.data.insertedId) {
                    axiosSecure.patch(`/allComment/${_id}`, {reaction: feedback})
                    .then(res => {
                        // console.log(res.data)
                        refetch()
                        toast.success('Report Done')
                    })
                }
            })
    }

    return (
        <tr>
            <th className="text-white">
                {index + 1}
            </th>
            <td>
                <div className="flex items-center gap-3">
                    <div>
                        <div className="font-bold text-white">{email}</div>
                    </div>
                </div>
            </td>
            <td className="text-white">
                {description.substring(0, 20)}<span onClick={() => handleReadMore(description)} className="btn btn-ghost btn-xs text-blue-800">...Read More</span>
            </td>
            <th>
                <div>
                    <select
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="select w-32 max-w-xs">
                        <option value=''>Pic One</option>
                        <option value='Violence'>Violence</option>
                        <option value='Harassment'>Harassmen</option>
                        <option value='Dont like it'>Dont like it</option>
                    </select>
                </div>
            </th>
            <th>
                <button disabled={!feedback || comment.reaction} onClick={() => handleFeedback(feedback)} className="btn btn-ghost btn-xs bg-red-500 text-white">Report</button>
            </th>
        </tr>
    );
};

export default ReportToAdmin;