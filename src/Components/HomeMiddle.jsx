import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";
import HomeCard from "./HomeCard";
import { useState } from "react";
import './index/index.css';


const HomeMiddle = () => {

    const axiosPublic = UseAxiosPublic()
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState([])

    const { data: recivedData = [] } = useQuery({
        queryKey: ['recivedData', search],
        queryFn: async () => {
            const res = await axiosPublic.get(`/addPost?search=${search}`)
            setSort(res.data)
            return res.data
        }
    })

    const handleSort = () => {
        const sortBy = [...recivedData].sort((a, b) => b.vote?.length - a.vote?.length);
        setSort(sortBy);
    }

    return (
        <div>
            <div className='flex justify-between gap-3 py-5'>
                <input
                    className='input input-bordered text-white w-full max-w-xs border-gray-500 bg-[#202020] focus:border-white'
                    type='text'
                    name='search'
                    onChange={e => setSearch(e.target.value)}
                    value={search}
                    placeholder='Enter A Tag Name'
                    aria-label='Enter A Tag Name'
                />
                <button onClick={handleSort} className="btn bg-blue-700 border-none text-white">Sort by popularity</button>
            </div>
            <div className="grid grid-cols-1 gap-4">
                {
                    sort.map(recived => <HomeCard
                        key={recived._id}
                        recived={recived}
                    ></HomeCard>)
                }
            </div>
        </div>
    );
};

export default HomeMiddle;