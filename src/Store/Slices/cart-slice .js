
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    cartItems: []
}

const slice = createSlice({
    name: "Cart",
    initialState,
    reducers: {
        addToCart(state,action){
            state.cartItems.push(action.payload)
        },
        removeFromCart(state,action){
            state.cartItems = [...state.cartItems.filter( (_,index) => index !== action.payload)]
        },
        incrementQuantity(state,action){
            state.cartItems[action.payload].quantity++;
        },
        decrementQuantity(state,action){
            if(state.cartItems[action.payload].quantity > 1){
                state.cartItems[action.payload].quantity--;
            }
        },
        clearCart(state){
            state.cartItems = [];
        }
    }
})

export default slice.reducer;
export const {addToCart,incrementQuantity,decrementQuantity, removeFromCart,clearCart} = slice.actions;
