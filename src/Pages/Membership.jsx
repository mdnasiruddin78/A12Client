import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet-async";
import CheckoutForm from "../Components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Membership = () => {
    return (
        <div className="bg-base-300 ">
            <Helmet>
                <title>BologSpace | Membership</title>
            </Helmet>
            <h3 className="text-xl font-bold text-center"><u>Payment</u></h3>
            <div className="flex justify-center p-4 rounded-md">
                <div className="w-[500px]">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm></CheckoutForm>
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Membership;