

import { useParams } from "react-router-dom"
import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from "../Store/Slices/cart-slice "
import { IoMdCheckmark } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { Link } from "react-router-dom";
import { clearCart } from "../Store/Slices/cart-slice "


function Details() {

    const [viewModal, setViewModal] = useState(false)
    const dispatch = useDispatch()
    const products = useSelector((state) => state.Products.products)
    const index = useParams().index
    const element = products[index]

    const [quantity, setQuantity] = useState(1)

    function decrementQuantity() {
        if (quantity > 1) {
            setQuantity(q => q - 1)
        }
    }

    function incrementQuantity() {
        setQuantity(q => q + 1)
    }

    function handleAddToCart() {
        const cartItem = {
            quantity: quantity,
            item: element
        }
        dispatch(addToCart(cartItem))
        setViewModal(true)
    }

    function handleCheckout() {
        dispatch(clearCart())
    }

    function closeModal() {
        setViewModal(false)
    }

    return (
        <div className="flex justify-center">
            {
                !element
                    ? null
                    :
                    <div className="flex flex-col sm:flex-row w-[80vw] p-6">

                        <img src={element.images[0]} loading="lazy" alt="Product's Image"
                            className="aspect-square w-[100%] sm:w-[60%] lg:rounded-sm object-contain rounded-xl bg-gray-200" />

                        <div className="flex gap-6 flex-col mt-6 lg:w-[40%] sm:ml-6">
                            <h5 className="text-3xl">{element.title}</h5>
                            {
                                element.availabilityStatus === "In Stock"
                                    ? null
                                    : <span className=" text-xl text-red-400">{element.availabilityStatus}</span>
                            }
                            <p>$ {element.price}</p>

                            <div>
                                <p className="text-sm">Quantity</p>
                                <div className="mt-2 border border-black rounded flex justify-evenly">
                                    <button className="w-[25%]" onClick={decrementQuantity}>-</button>
                                    <input className="w-[50%] text-center" type="number" readOnly value={quantity} />
                                    <button className="w-[25%]" onClick={incrementQuantity}>+</button>
                                </div>
                            </div>

                            <button onClick={handleAddToCart} className="border border-black rounded hover:border-2 py-2">Add To Cart</button>
                            <button className="bg-yellow-300 rounded hover:bg-yellow-200 py-2">Buy It Now</button>

                        </div>

                        {
                            viewModal === true
                                ?
                                <div className=" border flex flex-col gap-6 p-3 border-black bg-white fixed top-[15vh] right-6 lg:right-[20vh] 
                                         lg:w-[25vw] w-[60vw]">
                                    <MdCancel onClick={closeModal} className="text-2xl self-end" />

                                    <p className="self-center text-center"><IoMdCheckmark className="inline" /> Your item has been added successfully</p>

                                    <Link className="self-center" to='/cart'>
                                        <button className="border w-[50vw] lg:w-[20vw] py-3 border-black rounded">View my cart</button>
                                    </Link>

                                    <Link className="self-center" to='/'>
                                        <button onClick={handleCheckout} className="self-center bg-yellow-300 w-[50vw] lg:w-[20vw] rounded  hover:bg-yellow-200 py-3">Checkout</button>
                                    </Link>

                                    <Link className="self-center mb-6" to='/'>
                                        <button className="border w-[50vw] lg:w-[20vw] py-3 border-black rounded">Continue Shopping</button>
                                    </Link>

                                </div>
                                : null
                        }

                    </div>
            }
        </div>
    )



}




export default Details