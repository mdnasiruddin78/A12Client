import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet-async";
import CheckoutForm from "../Components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Membership = () => {
    return (
        <div className="bg-base-300">
            <Helmet>
                <title>BologSpace | Membership</title>
            </Helmet>
            <div className="w-11/12 mx-auto">
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Membership;