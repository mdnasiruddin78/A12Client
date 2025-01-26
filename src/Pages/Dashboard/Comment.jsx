import { useParams } from "react-router-dom";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import { useState } from "react";


const Comment = () => {

    const { id } = useParams()
    const axiosSecure = UseAxiosSecure()
    const [feedback, setFeedback] = useState()
    console.log(feedback)
    const { data: comments = [] } = useQuery({
        queryKey: ['comments'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allComment/${id}`)
            return res.data;
        }
    })

    const handleReadMore = (text) => {
        Swal.fire({
            title: "Comment Text Details",
            text: `${text}`,
        });
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Email</th>
                            <th>Comment text</th>
                            <th>Feedback</th>
                            <th>Report button</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            comments.map((comment, index) => <tr key={comment._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <div className="font-bold">{comment.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {comment.description.substring(0, 20)}<span onClick={() => handleReadMore(comment.description)} className="btn btn-ghost btn-xs text-blue-800">...Read More</span>
                                </td>
                                <th>
                                    <Menu>
                                        <MenuHandler>
                                            <button
                                                value={feedback}
                                                onChange={(e) => setFeedback(e.target.value)}
                                                className="btn btn-ghost btn-xs bg-black text-white">Feedback</button>
                                        </MenuHandler>
                                        <MenuList>
                                            <MenuItem value='Menu item1'>Menu Item 1</MenuItem>
                                            <MenuItem value='Menu item2'>Menu Item 2</MenuItem>
                                            <MenuItem value='Menu item3'>Menu Item 3</MenuItem>
                                        </MenuList>
                                    </Menu>
                                </th>
                                <th>
                                    <button className="btn btn-ghost btn-xs bg-red-500 text-white">Report</button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Comment;