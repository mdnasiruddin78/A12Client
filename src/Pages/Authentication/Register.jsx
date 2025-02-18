import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../Provider/Authprovider";
import SocialLogin from "../../Components/SocialLogin";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {

    const axiosPublic = UseAxiosPublic()
    const { createUser, updateUserProfile, logoutUser } = useContext(authContext)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate()

    const onSubmit = async data => {
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            },
        })
        if (res.data.success) {
            createUser(data.email, data.password)
                .then(result => {
                    const loggedUser = result.user;
                    // console.log(loggedUser)
                    updateUserProfile(data.name, res.data.data.display_url)
                        .then(result => {
                            const userInfo = {
                                name: data.name,
                                email: data.email,
                                badge: 'Bronze',
                            }
                            // create user in the database
                            axiosPublic.post('/users', userInfo)
                                .then(res => {
                                    if (res.data.insertedId) {
                                        // console.log('user added in database')
                                        reset()
                                        toast.success('Registration Successfull Please Login');
                                    }
                                })
                        })
                    logoutUser()
                    navigate("/login")
                })
                .catch(error => {
                    // console.log(error)
                    toast.error(error.message);
                })
        }
    }

    return (
        <div className='flex justify-center items-center bg-[#181818]'>
            <Helmet>
                <title>BlogSpace | Register</title>
            </Helmet>
            <div className='flex w-full max-w-lg mx-auto overflow-hidden bg-[#262626] rounded-lg my-10'>
                <div className='w-full px-6 py-8 md:px-8'>
                    <div className='flex justify-center mx-auto'>
                        <img className='w-auto h-7 sm:h-8' src="" alt='' />
                    </div>
                    <p className='mt-3 text-xl text-center text-white '>
                        Register Now!
                    </p>
                    
                    <SocialLogin></SocialLogin>

                    <div className='flex items-center justify-between mt-4'>
                        <span className='w-1/5 border-b  lg:w-1/4'></span>

                        <div className='text-xs text-center text-gray-500 uppercase  hover:underline'>
                            or Registration with email
                        </div>

                        <span className='w-1/5 border-b dark:border-gray-400 lg:w-1/4'></span>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className='mt-4'>
                            <label
                                className='block mb-2 text-sm font-medium text-gray-500 '
                                htmlFor='name'
                            >
                                Username
                            </label>
                            <input
                                id='name'
                                autoComplete='name'
                                placeholder="enter your name"
                                name='name'
                                {...register("name", { required: true })}
                                className='block w-full px-4 py-2 text-white bg-[#181818]  border border-gray-500 focus:border-white rounded-lg focus:outline-none '
                                type='text'
                            />
                        </div>
                        <div className='mt-4'>
                            <label
                                className='block mb-2 text-sm font-medium text-gray-500 '
                                htmlFor='photo'
                            >
                                User Image
                            </label>
                            <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                        </div>
                        <div className='mt-4'>
                            <label
                                className='block mb-2 text-sm font-medium text-gray-500 '
                                htmlFor='LoggingEmailAddress'
                            >
                                Email Address
                            </label>
                            <input
                                id='LoggingEmailAddress'
                                autoComplete='email'
                                placeholder="enter your email"
                                name='email'
                                {...register("email", { required: true })}
                                className='block w-full px-4 py-2 text-white rounded-lg bg-[#181818] border-gray-500 border focus:border-white'
                                type='email'
                            />
                        </div>

                        <div className='mt-4'>
                            <div className='flex justify-between'>
                                <label
                                    className='block mb-2 text-sm font-medium text-gray-500 '
                                    htmlFor='loggingPassword'
                                >
                                    Password
                                </label>
                            </div>

                            <input
                                id='loggingPassword'
                                autoComplete='current-password'
                                placeholder="your password"
                                name='password'
                                {...register("password", {
                                    required: true,
                                    // minLength: 6,
                                    // maxLength: 20,
                                    // pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                })}
                                className='block w-full px-4 py-2 text-white rounded-lg bg-[#181818] border-gray-500 border focus:border-white'
                                type='password'
                            />
                            {/* {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                            {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                            {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                            {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>} */}
                        </div>
                        <div className='mt-6'>
                            <button
                                type='submit'
                                className='w-full px-6 py-3 text-sm font-medium tracking-wide text-white bg-blue-700 rounded-lg'
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>

                    <div className='flex items-center justify-between mt-4'>
                        <span className='w-1/5 border-b  md:w-1/4'></span>

                        <Link
                            to='/login'
                            className='text-xs uppercase font-semibold text-white hover:underline'
                        >
                            or sign in
                        </Link>
                        <span className='w-1/5 border-b  md:w-1/4'></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;