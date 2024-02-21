import React from "react";
import { useLocation } from "react-router-dom"; // Import if you're passing state to this component
import "./checkout.css"; // Ensure this CSS file contains styles you need, or create a specific one for confirmation

const Confirmation = () => {
  const location = useLocation();
  const { orderDetails } = location.state || {}; // Assuming you're passing order details via state

  return (
    <div className="checkcont confirmation-container">
      <h2>Thank You for Your Purchase!</h2>
      <p>Your payment to Anatolink has been successfully processed.</p>

      {/* Optional: Display order details if passed */}
      {orderDetails && (
        <>
          <h3>Order Summary</h3>
          <p>
            <strong>Order Number:</strong> {orderDetails.orderNumber}
          </p>
          <p>
            <strong>Total Amount:</strong> $
            {orderDetails.totalAmount.toFixed(2)}
          </p>
          {/* Add more details as needed */}

          <h3>What's Next?</h3>
          <p>
            You will receive an email confirmation shortly with your order
            details and a tracking number once your order ships.
          </p>
        </>
      )}

      <p>
        If you have any questions or concerns about your order, please contact
        us.
      </p>
    </div>
  );
};

export default Confirmation;
