import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import { useSelector, useDispatch } from "react-redux";
import { totalCartItems, fetchCartItems } from "./features/cart/cartSlice";
import Modal from "./components/Modal";
import LoadingSpinner from "./components/LoadingSpinner";
// import store from "./store/store";

// 3 important concepts of redux
// 1. Store - Keep all the state of the application
// 2. Action - Describes what you want to do
// 3. Reducer - Describes how your actions transform the state into the next state

const App = () => {
  const dispatch = useDispatch();
  const { cartItems, isLoading } = useSelector((store) => store.cart);
  const { showModal } = useSelector((store) => store.modal);

  useEffect(() => {
    dispatch(totalCartItems());
  }, [cartItems, dispatch]);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  return (
    <main>
      {showModal && <Modal />}
      {isLoading && <LoadingSpinner />}
      <Navbar />
      <CartContainer />
    </main>
  );
};

export default App;
