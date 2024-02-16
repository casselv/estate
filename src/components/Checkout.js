import React, { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./checkout.css";
import { useNavigate } from "react-router-dom";

const useGoogleMapsScript = (apiKey) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [apiKey]);
};

//import StripePaymentForm from "./StripePayment";

const Checkout = () => {
  useGoogleMapsScript("AIzaSyBbvlObfwjz8XcqHmzdNN_nCidNbNkUkpw");
  const navigate = useNavigate();
  const [errors, setErrors] = React.useState({});

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

  useEffect(() => {
    // Function to initialize the Autocomplete
    const initAutocomplete = () => {
      if (window.google) {
        // Initialize Google Places Autocomplete
        new window.google.maps.places.Autocomplete(address1Ref.current);
        new window.google.maps.places.Autocomplete(cityRef.current);
        new window.google.maps.places.Autocomplete(stateRef.current);
        new window.google.maps.places.Autocomplete(postalCodeRef.current);
        new window.google.maps.places.Autocomplete(countryRef.current);
        // Repeat for other inputs if necessary
      }
    };

    // Since Google Maps invokes the callback once the script is loaded,
    // attach initAutocomplete to the window object so it can be invoked as a callback.
    window.initAutocomplete = initAutocomplete;

    // Check if the Google Maps script is already loaded
    if (window.google && window.google.maps && window.google.maps.places) {
      // If already loaded, directly initialize the Autocomplete
      initAutocomplete();
    } else {
      // If not loaded, attach the initAutocomplete function to be called when the script is loaded
      const script = Array.from(document.getElementsByTagName("script")).find(
        (s) => s.src.includes("maps.googleapis.com")
      );

      if (script) {
        // Add a load event listener to the script tag
        script.addEventListener("load", initAutocomplete);
      }
    }

    // Cleanup function to remove the initAutocomplete from window object
    return () => {
      delete window.initAutocomplete;
    };
  }, []);

  // Function to calculate total price
  const calculateTotal = () => {
    return cart.reduce((acc, item) => {
      // Remove the "$" symbol and convert the price to a number
      const priceWithoutSymbol = parseFloat(item.price.replace("$", ""));

      // Calculate the total for each item and accumulate it
      return acc + priceWithoutSymbol * item.quantity;
    }, 0);
  };
  const totalPrice = calculateTotal();
  const handleCheckout = () => {
    let newErrors = {};

    // Validate full name and address line 1 (at least)
    if (!fullNameRef.current.value) {
      newErrors.fullName = "Full name is required.";
    }
    if (!address1Ref.current.value) {
      newErrors.address1 = "Address line 1 is required.";
    }

    // If there are any errors, update the state and do not navigate
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
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
              {item.name} - Quantity: {item.quantity} - Price: {item.price}
            </p>
            <img className="chekedimage" src={item.image_urls[0]} alt="" />
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
      {errors.fullName && <p className="error">{errors.fullName}</p>}
      {errors.address1 && <p className="error">{errors.address1}</p>}
      <button className="checkoutLit" onClick={handleCheckout}>
        Proceed to Payment
      </button>
    </div>
  );
};

export default Checkout;
//<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBbvlObfwjz8XcqHmzdNN_nCidNbNkUkpw&libraries=places&callback=initAutocomplete"></script>
