import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import MessageForm from "../../Components/MessageForm";


const TakeAction = () => {

  const { email } = useParams()
  const axiosSecure = UseAxiosSecure()

  const { data: recivedData = [],refetch} = useQuery({
    queryKey: ['recivedData'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/filter/${email}`)
      refetch()
      return res.data
    }
  })

  return (
    <div>
      <h3 className="text-xl font-bold">Send A Message:</h3>
      <div>
        <MessageForm recivedData={recivedData}></MessageForm>
      </div>
    </div>
  );
};

export default TakeAction;