import { useEffect } from "react"
import { useLoaderData } from "react-router-dom"
import { PaymentData } from "../services/types/paymentTypes"

const Checkout = () => {
    const loaderData = useLoaderData() 

    useEffect(() => {
       loaderData && console.log(loaderData)
    }, [])

    return (
        <div>
            success 
            <ul>
                {loaderData && loaderData.data.map((item: PaymentData) => (
                    <li key={item.orderId}>
                        {item.status}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Checkout;
