import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./reviewOrder.css"; // Make sure to style your review page accordingly

const ReviewOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, userData, totalPrice } = location.state;

  // Function to navigate back to checkout if edits are needed
  const handleEditOrder = () => {
    navigate("/checkout", { state: { cart } });
  };

  // Function to proceed to payment
  const handleProceedToPayment = () => {
    navigate("/payment", { state: { userData, totalPrice, cart } });
  };

  return (
    <div className="review-order-container">
      <h2>Review Your Order</h2>
      <div className="order-summary">
        <h3>Products</h3>
        {cart.map((item) => (
          <div key={item.id} className="product-summary">
            <p>
              {item.name} - Quantity: {item.quantity} - Price: {item.price}
            </p>
            <img
              className="product-image"
              src={item.image_urls[0]}
              alt={item.name}
            />
          </div>
        ))}
        <h3>Order Price</h3>
        <p>Total Product Price: ${totalPrice}</p>{" "}
        {/* Assumes totalPrice is just the products */}
        <h3>Shipping Details</h3>
        <p>Full Name: {userData.fullName}</p>
        <p>Email: {userData.email}</p>
        <p>
          Address: {userData.address1} {userData.address2}
        </p>
        <p>City: {userData.city}</p>
        <p>State/Region: {userData.state}</p>
        <p>Postal Code: {userData.postalCode}</p>
        <p>Country: {userData.country}</p>
        <h3>Shipping Price</h3>
        <p>$11.00</p> {/* Static shipping price */}
        <h3>Total Price</h3>
        <p className="ordersum">${(totalPrice + 11).toFixed(2)} AUD</p>{" "}
        {/* Total price including shipping */}
      </div>

      <div className="actions">
        <button onClick={handleEditOrder} className="edit-order-btn">
          Edit Order
        </button>
        <button
          onClick={handleProceedToPayment}
          className="proceed-payment-btn"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default ReviewOrder;
