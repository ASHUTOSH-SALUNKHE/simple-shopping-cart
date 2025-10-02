import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleCart} from "../reducers/cartReducer";
import toast from "react-hot-toast";
import CartProducts from "../components/CartProducts";
import CheckedoutProducts from "../components/CheckedoutProducts";

function CartPage() {
  const dispatch = useDispatch();
  const selector = useSelector((e) => e.cart);
  const [checkoutData, setCheckoutData] = useState([]);
  const [disabledButtons, setDisabledButtons] = useState([]);

  //addind/ updating newData only when values of cartItem and data changes and also in checkoutdata it stores the object { id: d.id, quantity: 1 }
  useEffect(() => {
    const newData = selector.data
      .filter((d) => selector.cartItems.includes(d.id))
      .map((d) => ({ id: d.id, quantity: 1 }));

    setCheckoutData(newData);
  }, [selector.data, selector.cartItems]);

  //function to remove items from cart
  function removeFromCart(id) {
    dispatch(handleCart(id));
    toast.success("Removed From CartSuccessfully");
  }
  
  if (selector.loading) {
    return <div className="absolute left-[50%] top-[50%]">Loading ...</div>;
  }

  return (
    <div className="px-3 py-10 backgroundColor">
      {/* Cart Section */}
      <div className="bg-white py-8 px-5">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 border-b-4 border-amber-400 w-fit pb-2">
          🛒 Cart Products
        </h2>

        <CartProducts
          checkoutData={checkoutData}
          setCheckoutData={setCheckoutData}
          disabledButtons={disabledButtons}
          setDisabledButtons={setDisabledButtons}
          removeFromCart={removeFromCart}
        />
      </div>

      {/* Checked Out Section */}
      <div className="bg-white  mt-20 p-8 ">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8  border-b-4 border-green-400 w-fit pb-2">
          ✅ Checked Out Products
        </h2>

        <CheckedoutProducts />
      </div>
    </div>
  );
}

export default CartPage;
