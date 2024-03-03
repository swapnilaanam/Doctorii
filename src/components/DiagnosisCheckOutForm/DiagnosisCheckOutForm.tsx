import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import '../CheckOutForm/CheckOutForm.css';
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const DiagnosisCheckOutForm = ({ bookingInfo, price }) => {
    const [clientSecret, setClientSecret] = useState('');
    const [cardError, setCardError] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');

    const convertedPrice = Number(price);

    const stripe = useStripe();
    const elements = useElements();

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

    const handleSubmit = async (event: Event) => {
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


        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: bookingInfo?.customerEmail || 'unknown',
                        name: bookingInfo?.customerName || 'anonymous'
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

            const newBooking = { ...bookingInfo, transactionId: paymentIntent?.id };

            const diagnosisPayment = {
                email: bookingInfo?.customerEmail,
                name: bookingInfo?.customerName,
                transactionId: paymentIntent?.id,
                ticketPrice: convertedPrice,
                paymentDate: new Date(),
                diagnosisName: bookingInfo?.diagnosisName,
            };

            console.log(diagnosisPayment);

            axios.post('/api/diagnosispayments', diagnosisPayment)
                .then((res) => {
                    if (res?.status === 201) {
                        axios.post('/api/bookings', newBooking)
                            .then((res) => {
                                if (res?.status === 201) {
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: `Payment Successful! You successfully booked the ticket!`,
                                        showConfirmButton: false,
                                        timer: 2500
                                    });
                                }
                            })
                            .catch((error) => console.log(error));
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
                    <button type="submit" className="bg-green-600 text-white w-1/2 h-10 mt-8 text-lg font-semibold rounded" disabled={!stripe || !clientSecret || processing}>
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

export default DiagnosisCheckOutForm;