import { closeSearch } from "../Store/Slices/search-slice"
import { useDispatch, useSelector } from "react-redux"
import { MdCancel } from "react-icons/md";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import { setSearchResults } from "../Store/Slices/search-slice";

function Search() {

    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState("")
    const searchResults = useSelector((state) => state.Search.searchResults)
    const products = useSelector((state) => state.Products.products)
    const viewSearch = useSelector((state) => state.Search.viewSearch)

    function handleCloseSearch() {
        dispatch(closeSearch())
    }

    function handleChange(e) {
        setSearchValue(e.target.value)
    }

    function searchItems() {
        let results = []
        if (products && products.length && products.length > 0) {
            products.map((element) => {
                if (containsSubstring(element.title, searchValue)) {
                    results.push(element)
                }
            })
        }
        dispatch(setSearchResults([...results]))
    }

    function containsSubstring(mainString, substring) {
        return mainString.toLowerCase().includes(substring.toLowerCase());
    }

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

        function handleClickEvent(e) {
            if (e.target.id === 'overlay') {
                dispatch(closeSearch())
            }
        }

        if (viewSearch) {
            window.addEventListener("click", handleClickEvent)
            document.documentElement.style.overflowY = "hidden"
        }
        else {
            document.documentElement.style.overflowY = "auto";
            setSearchValue("");
        }

        return () => {
            window.removeEventListener("click", handleClickEvent);
            document.documentElement.style.overflowY = "auto";
        }
    
    }, [viewSearch])


    useEffect(() => {
        if (searchValue.length > 1) {
            searchItems()
        }
        else {
            dispatch(setSearchResults([]))
        }
    }, [searchValue])



    return (
        <>
            <div id="overlay" className=" h-[100vh] w-[100vw] fixed top-0 bg-black opacity-50"></div>

            <div 
                className='opacity-100 transition-opacity w-[100vw] h-[15vh] fixed top-0 bg-white flex justify-center items-center gap-4'>

                <div className="relative">
                    <div className="lg:w-[40vw] w-[70vw] relative flex">
                        <input placeholder="Search" value={searchValue} onChange={handleChange}
                            className=" box-border outline-black border-2 rounded p-4 w-[100%] h-[5vh] border-black" type="text" />
                    </div>

                    {
                        searchResults && searchResults.length && searchResults.length > 0
                            ?
                            <div className="border-2 border-t-0 bg-white border-black h-[40vh] lg:w-[40vw] w-[70vw] flex flex-col gap-4 p-4 absolute top-[5vh]">
                                <h4 className="border-b-2 border-gray-200 text-sm text-gray-500 p-2">Products ({searchResults.length})</h4>
                                <ul id="scrollable-section" className="flex flex-col max-h-[20vh] overflow-y-scroll">
                                    {
                                        searchResults.map((element, index) =>
                                            <Link onClick={handleCloseSearch}
                                                className='last:border-b-0 min-h-[15vh] w-[100%] flex items-center hover:bg-gray-200'
                                                key={index} to={`/product-details/${findIndex(element)}`}>
                                                <img className="aspect-square w-[15%]" src={element.images[0]} alt="Product's Image" />
                                                <p>{element.title}</p>
                                            </Link>
                                        )
                                    }
                                </ul>
                                <Link onClick={handleCloseSearch} to={`/Components/search-results`}>
                                    <div className="relative flex items-center border-t-2 border-gray-200 text-sm text-gray-500 p-2">
                                        <p>Search for '{searchValue}'</p>
                                        <FaArrowRight className="absolute right-2" />
                                    </div>
                                </Link>
                            </div>
                            : null
                    }

                </div>

                <MdCancel onClick={handleCloseSearch} className="text-2xl cursor-pointer" />

            </div>

        </>
    )


}

export default Search