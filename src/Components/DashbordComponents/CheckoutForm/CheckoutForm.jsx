import { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';
import { useAxiosSecure } from '../../../Hooks/useAxios';
import useAuthContext from '../../../Hooks/useAuthContext';
import Spinner from './../../NotFound&Loading/Spinner';

const CheckoutForm = ({ amount,data }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const axiosSecure = useAxiosSecure();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // state for error message

  useEffect(() => {
    const fetchClientSecret = async () => {
      setLoading(true);
      try {
        const response = await axiosSecure.post(`/create-payment-intent?email=${user.email}`, {
          amount: amount * 100, // Stripe accepts amount in cents
        });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error('Error creating payment intent', error);
        setErrorMessage('An error occurred while creating the payment intent.');
      }
      setLoading(false);
    };
    if (amount > 0) {
      fetchClientSecret();
    }
  }, [amount, user.email]);

  if (loading) {
    return <Spinner />; // or a spinner
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) {
        return;
    }

    // Confirm the card payment with the client secret
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: elements.getElement(CardElement),
        },
    });

    if (error) {
        setErrorMessage(`Payment failed: ${error.message}`); // Set error message
    } else if (paymentIntent.status === 'requires_action') {
        // Handle 3D Secure authentication if required
        const { error: actionError, paymentIntent: confirmedPaymentIntent } = 
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

        if (actionError) {
            setErrorMessage(`Payment failed: ${actionError.message}`);
        } else {
            alert(`Payment Successful!\nAmount: $${(confirmedPaymentIntent.amount / 100).toFixed(2)}\nTransaction ID: ${confirmedPaymentIntent.id}`);
        }
    } else if (paymentIntent.status === 'succeeded') {
        alert(`Payment Successful!\nAmount: $${(paymentIntent.amount / 100).toFixed(2)}\nTransaction ID: ${paymentIntent.id}`);
    }
};


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className="mb-3 block text-black dark:text-white mt-2">Card Details</label>
        <CardElement className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
      </div>
      {errorMessage && <p className="text-red-600 text-sm mt-2">{errorMessage}</p>} {/* Display error message */}
      <button
        type="submit"
        disabled={!stripe}
        aria-disabled={!stripe}
        className="mt-4 mb-3 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-700"
      >
        Pay ${(amount).toFixed(2)}
      </button>
    </form>
  );
};

CheckoutForm.propTypes = {
  amount: PropTypes.number.isRequired,
};

export default CheckoutForm;
