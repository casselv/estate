import React from "react";
import Product from "./Product";
import "./productlist.css";

const ProductList = ({
  products,
  onAddToCart,
  cart,
  cartItemCount,
  handleRemoveFromCart,
}) => {
  return (
    <div>
      <img className="godgiven" src="./banner3.png"></img>
      <div className="product-list">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            products={products}
            cart={cart}
            cartItemCount={cartItemCount}
            handleRemoveFromCart={handleRemoveFromCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
