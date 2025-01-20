/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';
import { useAxiosSecure } from '../../../Hooks/useAxios';
import useAuthContext from '../../../Hooks/useAuthContext';
import Spinner from './../../NotFound&Loading/Spinner';

const CheckoutForm = ({ amount,info }) => {
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
  
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement) },
    });
  
    if (error) {
      setErrorMessage(`Payment failed: ${error.message}`);
    } else if (paymentIntent.status === 'succeeded') {
      const paymentData = {
        userId: user._id, 
        userEmail: user.email,
        userName : user.name,
        apartmentId: info?.apartmentId,
        month: info?.month, 
        rent: info.rent, 
        discount: info.discount, 
        finalAmount: info.finalAmount, 
        paymentStatus: "paid",
        paymentDate: new Date().toISOString(),
        transactionId: paymentIntent.id
      };
  
      try {
        await axiosSecure.post('/payments/save', paymentData);
        alert(`Payment Successful! Transaction ID: ${paymentIntent.id}`);
      } catch (error) {
        setErrorMessage("Payment recorded failed in database.",error);
      }
    }
  };
  

  // w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-textT outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-inpu dark:focus:border-primary
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className="mb-3 block text-textT dark:text-white mt-2">Card Details</label>
        <CardElement className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-textT outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-inpu dark:focus:border-primary" />
      </div>
      {errorMessage && <p className="text-red-600 text-sm mt-2">{errorMessage}</p>} {/* Display error message */}
      <button
        type="submit"
        disabled={!stripe}
        aria-disabled={!stripe}
        className="mt-4 mb-3 px-4 py-2 bg-orange-500 text-white dark:text-whaite rounded-lg hover:bg-orange-700"
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
