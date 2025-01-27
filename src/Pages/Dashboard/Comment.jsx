import { useParams } from "react-router-dom";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ReportToAdmin from "../../Components/ReportToAdmin";


const Comment = () => {

    const { id } = useParams()
    const axiosSecure = UseAxiosSecure()

    const { data: comments = [] } = useQuery({
        queryKey: ['comments'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allComment/${id}`)
            return res.data;
        }
    })

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
                            comments.map((comment,index) => <ReportToAdmin
                                key={comment._id}
                                comment={comment} index={index}></ReportToAdmin>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Comment;