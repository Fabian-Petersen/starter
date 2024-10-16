import React from "react";
import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";

// 3 important concepts of redux
// 1. Store - Keep all the state of the application
// 2. Action - Describes what you want to do
// 3. Reducer - Describes how your actions transform the state into the next state

const App = () => {
  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  );
};

export default App;
