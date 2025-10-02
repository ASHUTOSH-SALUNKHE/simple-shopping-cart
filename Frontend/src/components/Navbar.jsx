import React , {useEffect, useState} from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

function Navbar({ searchItem, setSearchItem }) {
  const navigate = useNavigate();
  const [cartPage, setCartPage] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    if (cartPage) {
      navigate("/cart");
    } else {
      navigate("/");
    }
  }, [cartPage]);

  function getCart(e) {
    e.preventDefault();
    setCartPage(!cartPage);
  }

  function setSearchData(e){
    const value = e.target.value;
    setSearchItem(value);
  }
  return (
    <div className="h-25 bg-black flex items-center w-full">
      <div className="flex w-full justify-between items-center  ml-5 mr-5 ">
        <div className="font-bold text-amber-50 text-3xl gradient-text flex items-center">
          Verto Electronics
        </div>

        {location.pathname === "/" && (
          <div className="hidden w-[30vw] bg-amber-400 rounded-2xl md:flex items-center h-10  ">
            <input
              className="bg-amber-50 h-full w-[calc(30vw-45px)] pl-2 outline-none"
              value={searchItem}
              onChange={setSearchData}
            ></input>
            <div className="flex justify-center items-center  w-[45px]">
              <img src="./search.svg" className="h-[28px]"></img>
            </div>
          </div>
        )}

        <button className="flex items-end" onClick={(e) => getCart(e)}>
          {cartPage ? (
            <div className="flex items-end border-2  ">
              <img src="/home.svg" alt="cart" className="h-14"></img>
            </div>
          ) : (
            <div className="flex items-end ">
              <img src="/cart.svg" alt="cart" className="h-10"></img>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
