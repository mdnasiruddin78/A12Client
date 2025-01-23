import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";
import HomeCard from "./HomeCard";
import { useEffect, useState } from "react";
import axios from "axios";
import './index/index.css';


const HomeMiddle = () => {

    const axiosPublic = UseAxiosPublic()
    // const [search, setSearch] = useState('')
    // const [filter, setFilter] = useState('')
    // const [services, setServices] = useState([])
    const [sort, setSort] = useState([])

    const { data: recivedData = [] } = useQuery({
        queryKey: ['recivedData'],
        queryFn: async () => {
            const res = await axiosPublic.get('/addPost')
            return res.data
        }
    })

    const handleSort = () => {
        const sortBy = [...recivedData].sort((a, b) => b.vote - a.vote);
        setSort(sortBy);
    }

    // useEffect(() => {
    //     const fetchAllService = async () => {
    //         const { data } = await axios.get(`${import.meta.env.VITE_API_KEY}/addPost?filter=${filter}&search=${search}`)
    //         setServices(data)
    //     }
    //     fetchAllService()
    // }, [filter, search])

    // const { data: allTag = [] } = useQuery({
    //     queryKey: ['allTag'],
    //     queryFn: async () => {
    //         const res = await axiosPublic.get('/addTags')
    //         return res.data
    //     }
    // })

    return (
        <div>
            {/* <div className='flex justify-between gap-3 py-5'>
                <input
                    className='input input-bordered w-full max-w-xs'
                    type='text'
                    name='search'
                    onChange={e => setSearch(e.target.value)}
                    value={search}
                    placeholder='Enter A Tag Name'
                    aria-label='Enter A Tag Name'
                />
                <select
                    className="select select-bordered"
                    onChange={e => setFilter(e.target.value)}
                    value={filter}
                    required
                >
                    <option defaultValue>Select A Tag!</option>
                    {
                        allTag.map(tag => <option key={tag._id} value={tag.tag}>{tag?.tag}</option>)
                    }
                </select>
            </div> */}
            <div className="flex justify-end py-4">
                <button onClick={handleSort} className="btn adminColor">sort by popularity</button>
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