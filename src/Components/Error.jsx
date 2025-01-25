import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import '../Components/index/index.css';


const Error = () => {
    return (
        <div className='max-w-6xl mx-auto flex justify-center items-center flex-col mt-[220px] space-y-3 p-10'>
            <Helmet>
                <title>BlogSpace | Error</title>
            </Helmet>
            <h3 className='text-3xl text-red-500 text-center font-bold'>PAGE NOT FOUND</h3>
            <p className='text-3xl text-red-500 text-center font-bold'>ERROR 404 STATUS</p>
            <Link to="/" className='btn bg-white text-red-500 adminColor'>Back to Home</Link>
        </div>
    );
};

export default Error;