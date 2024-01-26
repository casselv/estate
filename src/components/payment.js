import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StripePaymentForm from "./StripePayment";
import "./payment.css";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, totalPrice, cart } = location.state;

  // Function to handle successful payment
  const handlePaymentSuccess = async (paymentMethodId) => {
    try {
      // Define the orderData object
      const orderData = {
        ...userData, // spread userData object to include its properties
        cartItems: cart,
        paymentMethodId,
        total: totalPrice,
      };

      const response = await fetch("http://localhost:3013/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Order creation failed");
      }

      // If the response is OK, navigate to the confirmation page
      navigate("/confirmation");
    } catch (error) {
      console.error("Order creation error:", error);
      alert("There was an issue with your order. Please try again.");
    }
  };

  return (
    <div className="paymentcont">
      <StripePaymentForm
        handlePaymentSuccess={handlePaymentSuccess}
        totalPrice={totalPrice}
      />
    </div>
  );
};

export default PaymentPage;
