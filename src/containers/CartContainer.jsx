import React from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const authState = useSelector((state) => state?.authReducer);

  const { isLoggedIn } = authState;
  if (!isLoggedIn) {
    return (
      <>
        <main>Login to see your items in Cart</main>
      </>
    );
  }
  return (
    <>
      <main>Cart page</main>
    </>
  );
};

export default Cart;
