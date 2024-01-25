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
    <div className="detailed">
      <div className="imaged">
        <img className="productimaged" src={product.imageUrl} alt=""></img>
      </div>
      <div className="text">
        <h1 className="productname">{product.name}</h1>{" "}
        {/* Corrected this line */}
        <h4 className="productPrice">{product.price}</h4>
        <p className="productdescriptor">{product.description}</p>
        {/* You can add more details here */}
        <button className="productbutton" onClick={() => onAddToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Details;
