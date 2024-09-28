

function Product({ element }) {


    return (
        <div className="lg:w-[20vw] w-[45vw] flex flex-col gap-3 p-3 
                cursor-pointer hover:underline-offset-4 hover:underline ">

            <div className="relative w-[100%] flex justify-center">
                <div className="aspect-square w-[90%] rounded-xl bg-gray-200">
                    <img src={element.images[0]} loading="lazy" alt="Product's Image" className="hover:scale-110 transition-transform aspect-square w-[100%] object-contain rounded-xl" />
                </div>
                {
                    element.availabilityStatus === "In Stock"
                        ? null
                        : <span className="absolute hidden lg:block lg:bottom-2 left-[10%] text-sm bg-black text-white px-2 py-1">{element.availabilityStatus}</span>
                }
            </div>

            <h6 className="text-sm truncate w-[95%] ml-[5%]">{element.title}</h6>
            <p className="ml-[5%]">$ {element.price}</p>
            
        </div>
    )


}

export default Product