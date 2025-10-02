import { useSelector , useDispatch } from 'react-redux';
import toast from "react-hot-toast";
import {newCheckOut, setCheckedData, handleCart,} from "../reducers/cartReducer";

function CartProducts({ checkoutData, setCheckoutData, disabledButtons  ,setDisabledButtons , removeFromCart }) {
  const selector = useSelector((e) => e.cart);
  const dispatch = useDispatch();
  
  //increse the count of product
  function increse(id) {
    setCheckoutData((prev) =>
      prev.map((d) => (d.id === id ? { ...d, quantity: d.quantity + 1 } : d))
    );
  }

  //decrese the count of product
  function decrese(id) {
    setCheckoutData((prev) =>
      prev.map((d) =>
        d.id === id && d.quantity > 1 ? { ...d, quantity: d.quantity - 1 } : d
      )
    );
  }

  //call newCheckOut(res) which is globle function which sends data to backend and backend return response {id: 1,quantity: 1,message: 'Checked Out successfully',success: true}
  async function checkOut(res) {
    try {
      const response = await dispatch(newCheckOut(res)).unwrap();
      if (response.success) {
        setDisabledButtons((prev) => [...prev, res.id]);
        await dispatch(
          setCheckedData({
            id: res.id,
            name: res.name,
            quantity: res.quantity,
            imgUrl: res.imgUrl,
            totalPrice: res.totalPrice,
          })
        );
        dispatch(handleCart(res.id));

        if (response.success) {
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      }
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {selector.data.map((d, key) => {
        const checkedData = checkoutData.find((obj) => obj.id === d.id);
        if (checkedData) {
          return (
            <div
              key={key}
              className="border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all bg-white flex flex-col md:flex-row gap-6"
            >
              {/* Image */}
              <img
                src={d.imageUrl}
                alt={d.name}
                className="w-full  md:w-[40vw] lg:w-[18vw] h-56 object-cover rounded-lg"
              />

              {/* Details */}
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{d.name}</h3>
                  <p className="text-lg text-gray-600 mt-2">
                    Price: <span className="font-semibold">₹{d.price}</span>
                  </p>
                </div>

                {/* Quantity Selector */}
                <div className="mt-4 lg:flex lg:gap-5 items-end">
                  <div>
                    <p className="font-medium">Select Quantity</p>
                    <div className="flex items-center gap-4 mt-2">
                      <button
                        onClick={() => decrese(d.id)}
                        className="px-3 py-1 bg-red-300 hover:bg-red-400 rounded-md text-xl font-bold"
                      >
                        -
                      </button>
                      <span className="text-xl font-semibold">
                        {checkedData.quantity}
                      </span>
                      <button
                        onClick={() => increse(d.id)}
                        className="px-3 py-1 bg-amber-300 hover:bg-amber-400 rounded-md text-xl font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="bg-red-500 rounded-xl p-1 px-4 mt-3 lg:mt-0"
                    onClick={() => removeFromCart(d.id)}
                  >
                    Remove
                  </button>
                </div>

                {/* Total + Checkout Button */}
                <div className="mt-6">
                  <p className="text-lg font-semibold text-gray-700">
                    Total: ₹{d.price * checkedData.quantity}
                  </p>
                  <button
                    className={`mt-4 w-50 py-2 rounded-lg font-semibold shadow-md transition-all ${
                      disabledButtons.includes(d.id)
                        ? "bg-green-500 text-white cursor-not-allowed"
                        : "bg-amber-400 hover:bg-amber-500 text-gray-900"
                    }`}
                    disabled={disabledButtons.includes(d.id)}
                    onClick={() =>
                      checkOut({
                        id: d.id,
                        name: d.name,
                        quantity: checkedData.quantity,
                        imgUrl: d.imageUrl,
                        totalPrice: d.price * checkedData.quantity,
                      })
                    }
                  >
                    {disabledButtons.includes(d.id)
                      ? "✅ Checked Out"
                      : "CheckOut"}
                  </button>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default CartProducts