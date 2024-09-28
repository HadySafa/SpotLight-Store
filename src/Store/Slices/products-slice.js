
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    products: []
}

const slice = createSlice({
    name: "Products",
    initialState,
    reducers: {
        defineProducts(state){
            state.products = [];
        },
        initializeProducts(state,action){
            if(action.payload.length > 0){
                const products = state.products;
                const newProducts = [...action.payload];
                const finalProducts = products.concat(newProducts)
                state.products = finalProducts
            }
        }
    }
})

export default slice.reducer;
export const {defineProducts,initializeProducts} = slice.actions;
