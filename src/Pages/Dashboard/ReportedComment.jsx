import { Helmet } from "react-helmet-async";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import AdminStep from "../../Components/AdminStep";


const ReportedComment = () => {

    const axiosSecure = UseAxiosSecure()

    const { data: reportComment = [],refetch } = useQuery({
        queryKey: ['reportComment'],
        queryFn: async () => {
            const res = await axiosSecure.get('/feedback')
            refetch()
            return res.data
        }
    })
    // console.log(reportComment)
    return (
        <div>
            <Helmet>
                <title>Dashboard | Reported-Comment</title>
            </Helmet>
            <h3 className="text-xl font-bold">Reported Activities:</h3>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Report By</th>
                            <th>Report Email</th>
                            <th>Comment</th>
                            <th>Feedback</th>
                            <th>Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reportComment.map((report, index) => <AdminStep
                                key={report._id}
                                report={report} index={index}></AdminStep>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportedComment;