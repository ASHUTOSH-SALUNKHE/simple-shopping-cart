import { useSelector , useDispatch } from 'react-redux';

function CheckedoutProducts() {
  const selector = useSelector((e) => e.cart);
 

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[...selector.checkedData].reverse().map((d, key) => (
        <div
          key={key}
          className="border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all bg-white flex flex-col md:flex-row gap-6"
        >
          {/* Image */}
          <img
            src={d.imgUrl}
            alt={d.name}
            className="w-full md:w-[18vw] h-56 object-cover rounded-lg"
          />

          {/* Details */}
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-gray-900">{d.name}</h3>
            <p className="text-lg text-gray-600 mt-2">
              Checkout Price:{" "}
              <span className="font-semibold">₹{d.totalPrice}</span>
            </p>

            <p className="text-lg text-gray-600 mt-2">
              Checkout Items:{" "}
              <span className="font-semibold">{d.quantity}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CheckedoutProducts