import { configureStore } from "@reduxjs/toolkit";
import ProductsSlice from "./Slices/products-slice";
import CartSlice from "./Slices/cart-slice ";
import SearchSlice from "./Slices/search-slice"

const store = configureStore({
    reducer:{
        Products:ProductsSlice,
        Cart:CartSlice,
        Search:SearchSlice
    }
})

export default store