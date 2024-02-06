import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Routes from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NavBar from "./components/NavBar";
import LandingPage from "./components/LandingPage";
import AddProduct from "./components/addProduct";
import Analysis from "./components/analysis";
import ProductList from "./components/ProductList";
import { productsData } from "./components/ProductsData";
import Checkout from "./components/Checkout";
import EccomerceNav from "./components/eccomerceNav";
import Confirmation from "./components/confirmation";
import Details from "./components/details";
import Cta from "./components/cta";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
//import UnityCanvas from "./components/UnityCanvas";
import PaymentPage from "./components/payment";
import ModelViewPage from "./components/model";
import InjuryDetailsPage from "./components/InjuryDetailsPage";
import PainDetailsPage from "./components/PainDetailsPage";
import Footer from "./components/Footer";

/*import EntryScreen from "./components/entryscreen";*/

const stripePromise = loadStripe(
  "pk_test_51OZWISFLBFXrO8t5CBXiWcNxCDLaROtB63mWeRQL9NJfDTJ3lOr04Khus5cO0v6N8VX0MOEZk57AYr02HLItEKrZ00zewUx8Oo"
);

function App() {
  const [cart, setCart] = useState([]);

  /*const [isAuthenticated, setIsAuthenticated] = useState(false);*/

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const handleAddToCart = (product) => {
    const productExists = cart.find((item) => item.id === product.id);
    if (productExists) {
      // Update quantity if product already exists in cart
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...productExists,
                quantity: productExists.quantity + 1,
              }
            : item
        )
      );
    } else {
      // Add new product to cart
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  /*
  const verifyPasscode = (enteredPasscode) => {
    const correctPasscode = process.env.REACT_APP_PASSCODE; // Define your correct passcode here
    if (enteredPasscode === correctPasscode) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect passcode");
    }
  };

  if (!isAuthenticated) {
    return <EntryScreen onVerifyPasscode={verifyPasscode} />;
  }*/

  return (
    <Router>
      <NavBar
        handleRemoveFromCart={handleRemoveFromCart}
        onAddToCart={handleAddToCart}
        cartItemCount={cartItemCount}
        cart={cart}
      />
      <Elements stripe={stripePromise}>
        <Routes>
          <Route path="/" element={<Cta />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/injury-details" element={<InjuryDetailsPage />} />
          <Route path="/pain-details" element={<PainDetailsPage />} />
          <Route path="/model" element={<ModelViewPage />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route
            path="/details/:productId"
            element={
              <Details
                handleRemoveFromCart={handleRemoveFromCart}
                onAddToCart={handleAddToCart}
                cartItemCount={cartItemCount}
                cart={cart}
              />
            }
          />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/analysis/" element={<Analysis />} />
          <Route
            path="/shop"
            element={
              <ProductList
                products={productsData}
                handleRemoveFromCart={handleRemoveFromCart}
                onAddToCart={handleAddToCart}
                cartItemCount={cartItemCount}
                cart={cart}
                EccomerceNav={EccomerceNav}
              />
            }
          />
        </Routes>
      </Elements>
      <Footer />
    </Router>
  );
}

export default App;
