import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { useState } from "react";
import toast from "react-hot-toast";


const MessageForm = ({ recivedData }) => {

    const { reportEmail, comment, reaction } = recivedData;
    const { register, handleSubmit, reset } = useForm();
    const [startDate, setStartDate] = useState(new Date());
    const axiosSecure = UseAxiosSecure();

    const onSubmit = (data) => {
        const restriction = {
            email: data.email,
            date: startDate,
            title: data.title,
            reportText: data.reportText,
            description: data.description,
        }
        axiosSecure.post('/restrictionMessage',restriction)
        .then(res => {
            console.log(res.data)
            if(res.data.insertedId){
                toast.success('Message Send Successfull!')
            }
        })
    }

    return (
        <div className="mt-5">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <div>
                    <p>Report Email:</p>
                    <input {...register("email", { required: true })}
                        defaultValue={reportEmail}
                        readOnly
                        type="text"
                        placeholder="Type Your Name"
                        className='block lg:w-1/2 w-full px-4 py-2 text-red-700 bg-white border border-black rounded-lg focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                    />
                </div>
                <div>
                    <p>Date:</p>
                    <DatePicker
                        className='border p-2 rounded-md border-black'
                        selected={startDate}
                        onChange={(date) => setStartDate(date)} />
                </div>
                <div>
                    <p>Restriction:</p>
                    <input {...register("title", { required: true })}
                        defaultValue={reaction}
                        readOnly
                        type="text"
                        placeholder="title"
                        className='block lg:w-1/2 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  border-black  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                    />
                </div>
                <div>
                    <p>Report Comment:</p>
                    <textarea {...register("reportText", { required: true })}
                        defaultValue={comment}
                        readOnly
                        type="text"
                        placeholder="Description"
                        className='block lg:w-1/2 w-full px-4 py-2 text-red-700 bg-white border rounded-lg  border-black  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                    />
                </div>
                <div>
                    <p>Description:</p>
                    <textarea {...register("description", { required: true })}
                        type="text"
                        placeholder="Description"
                        className='block lg:w-1/2 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  border-black  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                    />
                </div>
                <button className="btn adminColor">Submit</button>
            </form>
        </div>
    );
};

export default MessageForm;