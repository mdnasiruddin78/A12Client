import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";
import HomeCard from "./HomeCard";


const HomeMiddle = () => {

    const axiosPublic = UseAxiosPublic()
    const { data: recivedData = []} = useQuery({
        queryKey: ['recivedData'],
        queryFn: async () => {
            const res = await axiosPublic.get('/addPost')
            return res.data
        }
    })

    return (
        <div>
            <div className="grid grid-cols-1 gap-4">
                {
                    recivedData.map(recived => <HomeCard key={recived._id} recived={recived}></HomeCard>)
                }
            </div>
        </div>
    );
};

export default HomeMiddle;