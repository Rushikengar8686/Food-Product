import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your-publishable-key-here');

const CheckoutForm = ({ amount, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      console.log('PaymentMethod:', paymentMethod);

      // Create a PaymentIntent on the server (you need to implement this)
      const response = await fetch('/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amount * 100 }),
      });

      const paymentIntent = await response.json();

      const { error: confirmError, paymentIntent: confirmedPaymentIntent } = await stripe.confirmCardPayment(
        paymentIntent.client_secret,
        {
          payment_method: paymentMethod.id,
        }
      );

      if (confirmError) {
        console.error(confirmError);
      } else if (confirmedPaymentIntent.status === 'succeeded') {
        console.log('Payment successful!');
        onPaymentSuccess();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" className="btn btn-primary mt-3" disabled={!stripe}>
        Pay Now
      </button>
    </form>
  );
};

const PaymentGateway = ({ amount, onPaymentSuccess }) => {
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-center">Payment</h2>
          <p className="card-text"><strong>Total Amount:</strong> ${amount}</p>
          <Elements stripe={stripePromise}>
            <CheckoutForm amount={amount} onPaymentSuccess={onPaymentSuccess} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
