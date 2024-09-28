import { useEffect, useState } from "react";
import { initializeProducts,defineProducts } from "../Store/Slices/products-slice"
import { useDispatch, useSelector } from 'react-redux'
import Product from './product'
import { Link } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'


function Products() {

    const dispatch = useDispatch()

    const products = useSelector((state) => state.Products.products)
    const [pending, setPending] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    async function fetchProducts(URL) {
        try {
            setPending(true)
            const response = await fetch(URL);
            if (!response.ok) throw new Error("Failed to fetch data.")
            const data = await response.json();
            if (data) {
                setPending(false)
                dispatch(initializeProducts(data.products))
            }
        }
        catch (e) {
            setPending(false)
            setErrorMsg(e.message)
        }
    }

    const URLs = ['https://dummyjson.com/products/category/mens-shirts?limit=20', 'https://dummyjson.com/products/category/mens-shoes?limit=20',
        'https://dummyjson.com/products/category/mens-watches?limit=20', 'https://dummyjson.com/products/category/sunglasses?limit=20']

    useEffect(() => {
        dispatch(defineProducts())
        for (let URL of URLs) {
            fetchProducts(URL)
        }
    }, [])


    if (pending) return (<div className=""><ClipLoader className="fixed top-[50vh] left-[50vw]" /></div>)

    if (errorMsg) return (<div>{errorMsg}</div>)


    return (

        <div className="w-[100vw] flex justify-center">
            <div className="grid grid-cols-2 justify-items-center w-[100vw] gap-1 lg:grid-cols-4 lg:w-[80vw]">
                {
                    products && products.length && products.length > 0
                        ? products.map((element, index) =>
                            <Link key={index} to={`/product-details/${index}`}><Product key={index} element={element} /></Link>)
                        : <div>Nothing to show</div>
                }
            </div>
        </div>
    )



}

export default Products