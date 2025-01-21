import { useQuery } from '@tanstack/react-query';
import UseAxiosPublic from '../Hooks/UseAxiosPublic';
import './index/index.css';


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
        <div className="adminColor rounded-md text-center space-y-5 py-3">
           <h3 className="font-semibold">Use These Tags To Search</h3>
          {
            allTag.map(tag => <ul key={tag._id}><li>{tag.tag}</li></ul>)
          }
        </div>
    );
};

export default LeftNavbar;