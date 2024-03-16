import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import './CheckOutForm.css';
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useSession } from "next-auth/react";

const CheckOutForm = ({ appointmentInfo, price }) => {
    const [clientSecret, setClientSecret] = useState('');
    const [cardError, setCardError] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');

    const convertedPrice = Number(price);
    // console.log(appointmentInfo, convertedPrice);

    const stripe = useStripe();
    const elements = useElements();

    const session = useSession();

    useEffect(() => {
        if (convertedPrice && convertedPrice > 0) {
            axios.post('/api/create-payment-intent', {
                price
            })
                .then(res => {
                    setClientSecret(res.data?.clientSecret);
                })
                .catch(error => console.log(error));
        }
    }, [convertedPrice, price]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log('[error]', error?.message);
            setCardError(error?.message);
        } else {
            setCardError('');
            console.log('[PaymentMethod]', paymentMethod);
        }

        setProcessing(true);

        // console.log(clientSecret);

        const email = session?.data?.user?.email;
        const name = session?.data?.user?.name;

        // console.log(email, name);

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: email || 'unknown',
                        name: name || 'anonymous'
                    },
                },
            },
        );

        if (confirmError) {
            console.log(confirmError)
        }

        console.log('paymentIntent', paymentIntent);
        setProcessing(false);

        if (paymentIntent?.status === 'succeeded') {
            setTransactionId(paymentIntent?.id);

            const newAppointment = { ...appointmentInfo, transactionId: paymentIntent?.id };

            const payment = {
                email: appointmentInfo?.patientEmail,
                transactionId: paymentIntent?.id,
                ticketPrice: convertedPrice,
                date: new Date(),
                doctorEmail: appointmentInfo?.doctorEmail,
                doctorName: appointmentInfo?.doctorName
            };

            axios.post('/api/payments', payment)
                .then(res => {
                    // console.log(res);
                    if (res?.status === 201) {
                        axios.post('/api/appointments', newAppointment)
                            .then(res => {
                                // console.log(res);
                                if (res?.status === 201) {
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: `Payment Successful! You successfully booked the appointment!`,
                                        showConfirmButton: false,
                                        timer: 2500
                                    });
                                }
                            })
                            .catch(error => console.log(error));
                    }
                })
                .catch(error => console.log(error));
        }
    }

    return (
        <div className="max-w-5xl mx-auto px-4 lg:px-0">
            <form onSubmit={handleSubmit} id="checkoutform">
                <CardElement
                    className="shadow-xl border-2 rounded-md"
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div className="text-center">
                    <button type="submit" className="bg-blue-500 text-white w-3/4 h-10 mt-8 text-lg font-semibold rounded" disabled={!stripe || !clientSecret || processing}>
                        Pay Now
                    </button>
                </div>
            </form>
            {cardError && <p className="text-red-600 mt-4 ">{cardError}</p>}
            {transactionId && <p className="text-green-700 mt-4">
                Transaction complete with transactionId: {transactionId} (Wait few seconds for confirmation sweet alert)
            </p>}
        </div>
    );
};

export default CheckOutForm;