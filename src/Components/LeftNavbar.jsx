import { useQuery } from '@tanstack/react-query';
import UseAxiosPublic from '../Hooks/UseAxiosPublic';


const LeftNavbar = () => {

    const axiosPublic = UseAxiosPublic()

    const { data: allTag = [] } = useQuery({
        queryKey: ['tags'],
        queryFn: async () => {
            const res = await axiosPublic.get('/addTags')
            return res.data
        }
    })
    
    return (
        <div className="bg-[#262626] rounded-md text-center space-y-5 py-3 mt-5">
           <h3 className="font-semibold text-white">Use These Tags To Search</h3>
          {
            allTag.map(tag => <ul key={tag._id}><li className='text-white'>{tag.tag}</li></ul>)
          }
        </div>
    );
};

export default LeftNavbar;