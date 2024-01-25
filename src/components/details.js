// ProductDetail.js
import React from "react";
import "./details.css";
import EccomerceNav from "./eccomerceNav";
import { useParams } from "react-router-dom";
import { productsData } from "./ProductsData";

const Details = ({
  handleRemoveFromCart,
  onAddToCart,
  cartItemCount,
  cart,
}) => {
  const { productId } = useParams();
  // Assuming product IDs are strings, if they're numbers, you might need to parse them

  const product = productsData.find((p) => p.id === Number(productId));

  if (!product) {
    return (
      <div>
        <EccomerceNav
          cart={cart}
          handleRemoveFromCart={handleRemoveFromCart}
          cartItemCount={cartItemCount}
        />
        No product found
      </div>
    );
  }

  return (
    <div>
      <EccomerceNav
        cart={cart}
        handleRemoveFromCart={handleRemoveFromCart}
        cartItemCount={cartItemCount}
      />
      <h1>{product.name}</h1> {/* Corrected this line */}
      <img src={product.imageUrl} alt="Description of the image"></img>
      <h1>{product.price}</h1>
      <h1>{product.description}</h1>
      {/* You can add more details here */}
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default Details;
