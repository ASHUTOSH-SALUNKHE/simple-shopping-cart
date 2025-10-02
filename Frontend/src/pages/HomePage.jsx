import React , {useEffect} from 'react'
import Navbar from '../components/Navbar'
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts , handleCart , addData } from '../reducers/cartReducer';
import toast, { Toaster } from "react-hot-toast";

function HomePage({searchItem , setSearchItem}) {
  const dispatch = useDispatch();
  const selector = useSelector((e) => e.cart)

    //useEffect so that it would feetch data once to prevent api call on each render
    useEffect(()=> {

      const fetchData = async() => {
        const getProducts = await dispatch(fetchProducts());
        dispatch(addData(getProducts.payload));
      }
      fetchData();
      
    },[])
    
    //function for handling cart(remove/add) also shares toast notification
    function addInCart(id){
      if (selector.cartItems.includes(id)){
        dispatch(handleCart(id));
        toast.success("Removed From Cart Successfully");
      } 
      else{
        dispatch(handleCart(id));
        toast.success("Added in Cart Successfully");
      }
      
    }

    //filtering products where selector data should match with search data
    const filteredProducts = (selector.data || []).filter((d) =>
      (d?.name || "").toLowerCase().includes((searchItem || "").toLowerCase())
    );
    
    //set search data so that later we can filter products with (selector data && searchItem) common value
    function setSearchData(e){
        const value = e.target.value;
        setSearchItem(value);
    }

    //if data is in retriving state
    if(selector.loading === true){
      return(
        <div className = "absolute left-[50%] top-[50%]">Loading ...</div>
      )
    }
  return (
    <>
      <div className="md:hidden w-full flex mt-5 justify-center  ">
        <div className="w-[70vw] flex  h-10  bg-amber-200 border">
          <input
            className=" bg-white border-none outline-none w-[calc(70vw-45px)] pl-2"
            onChange={setSearchData}
          ></input>
          <div className="flex justify-center items-center ml-2 ">
            <img src="./search.svg" className="h-[28px]"></img>
          </div>
        </div>
      </div>

      <div className="mt-10 md:mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-2 py-2">
        {filteredProducts.map((product,key) => {
          return (
            <div className="border rounded-lg p-4 shadow-md bg-white" key={key}>
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <div className="flex justify-between">
                <div>
                  <div className="mt-2 font-bold">{product.name}</div>
                  <div className="text-gray-700">₹{product.price}</div>
                </div>

                <button
                  className="mt-2  bg-amber-100 rounded-2xl p-2"
                  onClick={() => addInCart(product.id)}
                >
                  {selector.cartItems.includes(product.id)
                    ? "Remove From Cart"
                    : "Add to cart"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default HomePage