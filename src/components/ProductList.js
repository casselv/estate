import React from "react";
import Product from "./Product";
import EccomerceNav from "./eccomerceNav";

const ProductList = ({
  products,
  onAddToCart,
  cart,
  cartItemCount,
  handleRemoveFromCart,
}) => {
  return (
    <div>
      <EccomerceNav
        cart={cart}
        handleRemoveFromCart={handleRemoveFromCart}
        cartItemCount={cartItemCount}
      />

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
