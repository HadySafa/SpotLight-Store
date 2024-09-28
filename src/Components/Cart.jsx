

import { incrementQuantity, decrementQuantity, clearCart, removeFromCart } from "../Store/Slices/cart-slice "
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import { BsTrash3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function Cart() {

    const cartItems = useSelector((state) => state.Cart.cartItems)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleIncrementQuantity(index) {
        dispatch(incrementQuantity(index))
    }

    function handleDecrementQuantity(index) {
        dispatch(decrementQuantity(index))
    }

    function handleRemoveFromCart(index) {
        dispatch(removeFromCart(index))
    }

    function calculateSubtotal() {
        return cartItems.reduce((previous, current) => previous += Math.ceil(current.quantity * current.item.price), 0)
    }

    function handleCheckout() {
        dispatch(clearCart())
        navigate("/")
    }

    return (
        <div className="flex justify-center">
            {
                cartItems && cartItems.length && cartItems.length > 0
                    ?
                    <div className="p-6 flex flex-col gap-6 lg:w-[80vw] lg:p-0 lg:mt-12">

                        <div className="flex justify-between">
                            <h2 className="text-2xl tracking-wide">Your Cart</h2>
                            <Link className="underline underline-offset-4" to='/'>Continue Shopping</Link>
                        </div>

                        <div>
                            <table className="w-[100%] box-border">

                                <thead>
                                    <tr className="border-b border-gray-400 text-gray-400">
                                        <th className="text-start  p-2  w-[50%] ">Product</th>
                                        <th className="text-center p-2  w-[30%] ">Quantity</th>
                                        <th className="text-end    p-2  w-[20%] ">Total</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        cartItems.map((element, index) =>
                                            <tr key={index}>

                                                <td className="lg:h-[15vh]">

                                                    <div className="flex gap-2 items-center" >
                                                        <img src={element.item.images[0]} alt="Product's Image" className="aspect-square w-[35%] lg:w-[20%]" />
                                                        <div className="flex flex-col gap-[1vh]">
                                                            <h5 className="text-sm lg:text-2xl">{element.item.title}</h5>
                                                            <p>{element.item.price}</p>
                                                        </div>
                                                    </div>

                                                </td>

                                                <td className="h-[15vh]">

                                                    <div className="flex flex-col lg:flex-row gap-2 items-center p-2 justify-center">
                                                        <div className="border border-black rounded flex justify-evenly">
                                                            <button className="w-[25%]" onClick={() => handleDecrementQuantity(index)}>-</button>
                                                            <input className="w-[50%] text-center" type="number" readOnly value={element.quantity} />
                                                            <button className="w-[25%]" onClick={() => handleIncrementQuantity(index)}>+</button>
                                                        </div>
                                                        <BsTrash3 onClick={() => handleRemoveFromCart(index)} className="text-xl lg:text-2xl cursor-pointer" />
                                                    </div>

                                                </td>

                                                <td className="h-[15vh] text-end text-xl px-2">

                                                    <p>$ {Math.ceil(element.quantity * element.item.price)}</p>

                                                </td>

                                            </tr>
                                        )
                                    }
                                </tbody>

                            </table>
                        </div>

                        <div className="flex flex-col gap-3 mt-6">
                            <p className="text-3xl">Subtotal: ${cartItems && cartItems.length && cartItems.length > 0 ? calculateSubtotal() : null}</p>
                            <p className="text-gray-400">Taxes and shipping calculated at checkout</p>
                            <button onClick={handleCheckout} className="bg-yellow-300 w-[40vw] rounded hover:bg-yellow-200 py-2">Checkout</button>
                        </div>

                    </div>

                    :
                    <div className="flex flex-col gap-6 mt-12">
                        <p className="text-2xl text-center">Your Cart is Empty</p>
                        <Link className="underline underline-offset-4" to='/'>
                            <button className="bg-yellow-300 w-[40vw] rounded hover:bg-yellow-200 py-2">Shop Now</button>
                        </Link>
                    </div>
            }
        </div>
    )

}

export default Cart