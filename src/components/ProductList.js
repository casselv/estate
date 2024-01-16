import React from "react";
import Product from "./Product";
import Cart from "./cart";

const ProductList = ({ products, onAddToCart, cart }) => {
  return (
    <div>
      <Cart cart={cart} />

      <div className="product-list">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
