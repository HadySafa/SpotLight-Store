import { useSelector } from "react-redux"
import Product from "./product"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react";



function SearchResult() {

    const searchResults = useSelector( (state) => state.Search.searchResults)
    const products = useSelector((state) => state.Products.products)
    const navigate = useNavigate()

    function findIndex(element) {
        let productIndex;
        products.map((product, index) => {
            if (product.id === element.id) {
                productIndex = index
            }
        })
        return productIndex
    }

    useEffect(() => {
        if (!(searchResults && searchResults.length > 0)) {
            navigate('/');
        }
    }, [searchResults]);

    return (
        <div className="flex items-center flex-col gap-6">
            <div><h4 className="text-3xl">Search Results</h4></div>
            <div><p>({searchResults.length}) results found</p></div>
            <div className="w-[80vw] grid grid-cols-2 lg:grid-cols-4">
                {
                    searchResults && searchResults.length && searchResults.length > 0
                    ?   
                    searchResults.map( (element,index) => <Link key={index} to={`/product-details/${findIndex(element)}`}><Product key={index} element={element} /></Link>)
                    : null
                }
            </div>
        </div>
    )

}

export default SearchResult