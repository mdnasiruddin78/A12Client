import { useQuery, useQueryClient} from "@tanstack/react-query";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";


const ManageUser = () => {

    const axiosSecure = UseAxiosSecure()
    const {data: users = []} = useQueryClient({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data;
        }
    })
    return (
        <div>
            <div className="flex justify-around">
                <h3 className="text-xl font-semibold">All Users</h3>
                <h3 className="text-xl font-semibold">Total Users: {users.length}</h3>
            </div>
        </div>
    );
};

export default ManageUser;