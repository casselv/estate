import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import "./checkout.css";
import { useNavigate } from "react-router-dom";

//import StripePaymentForm from "./StripePayment";

const Checkout = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { cart } = location.state;

  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const address1Ref = useRef(null);
  const address2Ref = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const postalCodeRef = useRef(null);
  const countryRef = useRef(null);

  // Function to calculate total price
  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const totalPrice = calculateTotal();
  const handleCheckout = () => {
    // Construct userData object with values from the refs
    const userData = {
      fullName: fullNameRef.current.value,
      email: emailRef.current.value,
      address1: address1Ref.current.value,
      address2: address2Ref.current.value || "",
      city: cityRef.current.value,
      state: stateRef.current.value,
      postalCode: postalCodeRef.current.value,
      country: countryRef.current.value,
    };

    // Navigate to the payment page with userData and other necessary data
    navigate("/payment", { state: { userData, totalPrice, cart } });
  };

  return (
    <div className="checkcont">
      {cart.map((item) => (
        <div className="boxdiv">
          <div key={item.id}>
            <p>
              {item.name} - Quantity: {item.quantity} - Price: ${item.price}
            </p>
            <img className="chekedimage" src={item.imageUrl} alt=""></img>
          </div>
        </div>
      ))}

      <div>
        <h4>Total: ${calculateTotal().toFixed(2)}</h4>
      </div>

      {/* Checkout form goes here */}
      <form>
        <h3>Contact Information</h3>
        <input
          type="text"
          ref={fullNameRef}
          name="fullName"
          placeholder="Full Name"
          required
        />
        <input
          type="email"
          ref={emailRef}
          emailRef
          name="email"
          placeholder="Email Address"
          required
        />

        <h3>Shipping Address</h3>
        <input
          type="text"
          ref={address1Ref}
          name="address1"
          placeholder="Address Line 1"
          required
        />
        <input
          type="text"
          ref={address2Ref}
          name="address2"
          placeholder="Address Line 2"
        />
        <input
          type="text"
          ref={cityRef}
          name="city"
          placeholder="City"
          required
        />
        <input
          type="text"
          name="state"
          ref={stateRef}
          placeholder="State/Province/Region"
          required
        />
        <input
          type="text"
          ref={postalCodeRef}
          name="postalCode"
          placeholder="Postal Code"
          required
        />
        <input
          type="text"
          name="country"
          ref={countryRef}
          placeholder="Country"
          required
        />

        {/* Payment details handled by a third-party component */}
      </form>
      <button className="checkoutLit" onClick={handleCheckout}>
        Proceed to Payment
      </button>
    </div>
  );
};

export default Checkout;
