import React from "react";
import "./details.css";
import EccomerceNav from "./eccomerceNav";
import { useParams } from "react-router-dom";

const Details = ({
  handleRemoveFromCart,
  onAddToCart,
  cartItemCount,
  cart,
  products, // Pass the products data as a prop
}) => {
  const { productId } = useParams();

  // Find the product in the products array based on the productId
  const product = products.find((p) => p.id === Number(productId));

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
    <div className="detailed">
      <div className="imaged">
        {product.image_urls.map((url, index) => (
          <img
            key={index}
            className="productimaged"
            src={url}
            alt={` ${index + 1}`}
          />
        ))}
      </div>
      <div className="text">
        <h1 className="productname">{product.name}</h1>
        <h4 className="productPrice">{product.price}</h4>
        <p className="productdescriptor">{product.description}</p>
        <button className="productbutton" onClick={() => onAddToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Details;
