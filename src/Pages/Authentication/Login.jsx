import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authContext } from "../../Provider/Authprovider";
import SocialLogin from "../../Components/SocialLogin";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";


const Login = () => {

    const {signInUser,setUser} = useContext(authContext)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const location = useLocation()

    const onSubmit = data => {
        console.log(data)
        signInUser(data.email, data.password)
        .then(result => {
            const user = result.user;
            setUser(user)
            navigate(location?.state? location.state : '/')
            toast.success('Login Successfull')
        })
        .catch(error => {
            console.log(error)
            toast.error(error.message)
        })
        reset()
    }

    return (
        <div className='flex justify-center items-center bg-base-200'>
            <Helmet>
                <title>BlogSpace | Login</title>
            </Helmet>
            <div className='flex w-full max-w-lg mx-auto overflow-hidden bg-white rounded-lg border-2 border-black my-10 '>
                <div className='w-full px-6 py-8 md:px-8 '>
                    <div className='flex justify-center mx-auto'>
                        <img className='w-auto h-7 sm:h-8' src="" alt='' />
                    </div>

                    <p className='mt-3 text-xl text-center text-gray-600 '>
                        Login Now!
                    </p>

                    <SocialLogin></SocialLogin>

                    <div className='flex items-center justify-between mt-4'>
                        <span className='w-1/5 border-b  lg:w-1/4'></span>

                        <div className='text-xs text-center text-gray-500 uppercase  hover:underline'>
                            or login with email
                        </div>

                        <span className='w-1/5 border-b dark:border-gray-400 lg:w-1/4'></span>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='mt-4'>
                            <label
                                className='block mb-2 text-sm font-medium text-gray-600 '
                                htmlFor='LoggingEmailAddress'
                            >
                                Email Address
                            </label>
                            <input
                                id='LoggingEmailAddress'
                                autoComplete='email'
                                name='email'
                                {...register("email", { required: true })}
                                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                                type='email'
                            />
                        </div>

                        <div className='mt-4'>
                            <div className='flex justify-between'>
                                <label
                                    className='block mb-2 text-sm font-medium text-gray-600 '
                                    htmlFor='loggingPassword'
                                >
                                    Password
                                </label>
                            </div>

                            <input
                                id='loggingPassword'
                                autoComplete='current-password'
                                name='password'
                                {...register("password", { required: true })}
                                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                                type='password'
                            />
                        </div>
                        <div className='mt-6'>
                            <button
                                type='submit'
                                className='w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50'
                            >
                                Sign In
                            </button>
                        </div>
                    </form>

                    <div className='flex items-center justify-between mt-4'>
                        <span className='w-1/5 border-b  md:w-1/4'></span>

                        <Link
                            to='/register'
                            className='text-xs font-semibold uppercase  hover:underline'
                        >
                            or sign up
                        </Link>

                        <span className='w-1/5 border-b  md:w-1/4'></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;