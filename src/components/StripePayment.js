import React, { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  CardElement,
  PaymentRequestButtonElement,
} from "@stripe/react-stripe-js";

const StripePaymentForm = ({ handlePaymentSuccess, totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [paymentRequest, setPaymentRequest] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: "AU", // Specify your country
        currency: "aud", // Specify your currency
        total: {
          label: "Total",
          amount: Math.round(totalPrice * 100),
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      pr.canMakePayment().then((result) => {
        if (result) {
          setPaymentRequest(pr);
        }
      });
    }
  }, [stripe, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setLoading(true);
    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error("Error:", error);
      setError(error.message);
      setLoading(false);
    } else {
      const paymentResult = await handleStripePayment(paymentMethod.id);
      if (paymentResult.success) {
        handlePaymentSuccess(paymentResult);
      } else {
        setError(paymentResult.message);
        setLoading(false);
      }
    }
  };

  const handleStripePayment = async (paymentMethodId) => {
    const amount = Math.round(totalPrice * 100);
    const cardName = document.querySelector(".cardName").value;
    console.log(cardName);
    try {
      // Make a POST request to your backend to finalize the payment
      const response = await fetch(
        "https://estateserver-production.up.railway.app/api/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ paymentMethodId, amount, cardName }), // Send the payment method ID to your backend
        }
      );

      if (!response.ok) {
        let errorMessage = "Payment failed. Please try again.";
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json(); // Only parse as JSON if the content type is correct
          errorMessage = errorData.error || errorMessage;
        } else {
          const textData = await response.text(); // Fallback to text if not JSON
          console.error("Non-JSON response received:", textData);
          errorMessage = "Non-JSON error received: " + textData;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return { success: true, message: "Payment successful", data };
    } catch (error) {
      console.error("Payment error:", error);
      return { success: false, message: "Payment failed. Please try again." };
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Securely Pay</h2>
      <div className="cardInputs">
        {paymentRequest && (
          <div>
            <PaymentRequestButtonElement options={{ paymentRequest }} />
          </div>
        )}
        <div>
          <h2>Or pay with card</h2>
          <input
            type="text"
            name="cardName"
            required
            placeholder="Name On Card"
            className="cardName"
          />
          <CardElement />
        </div>
      </div>
      {error && <div className="error">{error}</div>}
      <button className="paySub" type="submit" disabled={!stripe || loading}>
        Checkout With Stripe
      </button>
    </form>
  );
};

export default StripePaymentForm;
