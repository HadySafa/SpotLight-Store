
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    products: []
}

const slice = createSlice({
    name: "Products",
    initialState,
    reducers: {
        initializeProducts(state,action){
            if(action.payload.length > 0){
                state.products = state.products.concat([...action.payload])
            }
        }
    }
})

export default slice.reducer;
export const {initializeProducts} = slice.actions;
