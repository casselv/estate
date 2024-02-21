import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StripePaymentForm from "./StripePayment";
import "./payment.css";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, totalPrice, cart } = location.state;

  console.log("sdsd", userData);

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

      const response = await fetch(
        "https://estateserver-production.up.railway.app/api/order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        throw new Error("Order creation failed");
      }

      const paymentResult = await response.json();

      // If the response is OK, navigate to the confirmation page
      navigate("/confirmation", {
        state: { orderDetails: orderData },
      });
    } catch (error) {
      console.error("Order creation error:", error);
      alert("There was an issue with your order. Please try again.");
    }
  };

  return (
    <div className="paymentcont">
      <div className="leftpayment">
        <StripePaymentForm
          handlePaymentSuccess={handlePaymentSuccess}
          totalPrice={totalPrice}
        />
      </div>
      <div className="rightpayment">
        <img className="vec" src="vector.png" alt=""></img>
      </div>
    </div>
  );
};

export default PaymentPage;
