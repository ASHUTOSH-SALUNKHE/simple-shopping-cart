import {createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import { axiosInstance } from "../store/axios";

export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
  const response = await axiosInstance.get("/getProducts");
  return response.data;
});


export const newCheckOut = createAsyncThunk("newCheckOut", async (payload) => {
  const response = await axiosInstance.post("/checkProducts", payload);
  return response.data;
});


const initialState = {
  response: "",
  data: [],
  loading: false,
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  checkedData: JSON.parse(localStorage.getItem("checkedData")) || [],
};

const cartSlice = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    handleCart: (state, action) => {
      if (state.cartItems.includes(action.payload)) {
        state.cartItems = state.cartItems.filter((id) => id !== action.payload);
      } else {
        state.cartItems.push(action.payload);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    addData: (state, action) => {
      state.data = action.payload;
    },
    setCheckedData: (state, action) => {
      state.checkedData.push(action.payload);
      localStorage.setItem("checkedData", JSON.stringify(state.checkedData));
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      })

      // newCheckOut
      .addCase(newCheckOut.pending, (state) => {
        state.loading = true;
      })
      .addCase(newCheckOut.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload;
      })
      .addCase(newCheckOut.rejected, (state) => {
        state.loading = false;
      });
  },
});


export default cartSlice.reducer;

export const { handleCart, addData, setCheckedData } = cartSlice.actions; 