import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import Navbar from "./components/Navbar";
import toast, { Toaster } from "react-hot-toast";
function App() {
  const [searchItem , setSearchItem] = useState("");

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar searchItem={searchItem} setSearchItem={setSearchItem} />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage searchItem={searchItem} setSearchItem={setSearchItem} />
          }
        />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </>
  );
}

export default App;
