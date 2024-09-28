import { IoBagOutline } from "react-icons/io5";
import { LiaSearchSolid } from "react-icons/lia";
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux"
import { openSearch, closeSearch } from "../Store/Slices/search-slice"
import Search from "./search";

function Header() {

    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.Cart.cartItems)
    const viewSearch = useSelector((state) => state.Search.viewSearch)

    const [totalQuantity, setTotalQuantity] = useState(0)

    function calculateTotal(cartItems) {
        setTotalQuantity(cartItems.reduce((previous, current) => previous += current.quantity, 0))
    }

    function handleSearch() {
        dispatch(openSearch())
    }

    useEffect(() => {
        dispatch(closeSearch())
    }, [])

    useEffect(() => {
        if (cartItems && cartItems.length && cartItems.length > 0) {
            calculateTotal(cartItems)
        }
        else {
            setTotalQuantity(0)
        }
    }, [cartItems, cartItems.length])


    return (
        <header className="h-[15vh] sticky top-0 bg-white z-10
                           grid justify-items-center items-center grid-cols-4 grid-rows-1 lg:grid-cols-10">

            {/*Logo*/}
            <Link to='/' className="lg:justify-self-start col-start-2 col-span-2 row-start-1 lg:col-start-2">
                <img src="//theme-spotlight-demo.myshopify.com/cdn/shop/files/logo40.png?v=1677092556&amp;width=500" alt="Logo"
                    className="w-[50vw] h-[10vh] object-contain" />
            </Link>

            {/*Search Icon*/}
            <LiaSearchSolid onClick={handleSearch} className="lg:justify-self-end hover:scale-125 cursor-pointer transition-transform col-start-1 text-2xl row-start-1 lg:col-start-8" />

            {/*Cart Icon + Counter*/}
            <Link className="lg:justify-self-center hover:scale-125 transition-transform relative col-start-4 lg:col-start-9 row-start-1" to="/cart">
                <IoBagOutline className=" text-2xl" />
                {totalQuantity > 0
                    ? <div className="absolute top-4 left-4 col-start-4 lg:col-start-9 row-start-1 bg-yellow-300 h-5 w-5 text-center leading-5 rounded-full text-sm">{totalQuantity}</div>
                    : null}
            </Link>

            {/*Seearch Bar*/}
            {
                viewSearch
                    ?
                    <Search />
                    : null
            }

        </header>
    )

}

export default Header