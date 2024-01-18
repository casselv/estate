import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const StripePaymentForm = ({ handlePaymentSuccess, totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
    try {
      // Make a POST request to your backend to finalize the payment
      const response = await fetch(
        "http://localhost:3013/api/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ paymentMethodId, amount }), // Send the payment method ID to your backend
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
      <CardElement />
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={!stripe || loading}>
        Pay Now
      </button>
    </form>
  );
};

export default StripePaymentForm;
