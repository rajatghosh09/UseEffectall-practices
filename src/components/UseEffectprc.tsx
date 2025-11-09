import { StarIcon } from 'lucide-react';
import { useEffect, useState } from 'react'

interface product {
    id: number,
    title: string,
    description: string;
    price: number;
    discountPercentage?: number;
    rating?: number;
    stock?: number;
    brand?: string;
    category?: string;
    thumbnail?: string;
    images?: string;
}

const UseEffectprc = () => {
    // const [count, setCount] = useState(0);
    const [productList, setProductList] = useState<product[]>([]);

    useEffect(() => {
        // console.log("hellow")
        const fetchData = async () => {
            const response = await fetch("https://dummyjson.com/products")
            const data = await response?.json();
            // console.log("Responsed" , data);
            setProductList(data?.products)
        }

        fetchData();
    }, [])

    console.log("Productlist", productList);

    // console.log("count", count);

    return (
        <div>
            {/* <button onClick={() => setCount(count + 1)}>count</button> */}

            <div className='conatiner lg:p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {productList?.map((item, index) => (
                    // <div key={item.id || index} className='bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-200'>
                    //     <img src={item.images} alt={item.brand} className="w-full h-full object-cover" />
                    // </div>

                    <div key={item.id || index} className=" bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-200">
                        {/* image */}
                        <div className="relative h-44 md:h-52 w-full bg-gray-50">
                            <img
                                src={item.images?.[0] ?? ""}
                                alt={item.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            {/* category badge */}
                            {item.category && (
                                <span className="absolute top-3 left-3 text-xs font-medium bg-black/70 text-white px-2 py-1 rounded">
                                    {item.category}
                                </span>
                            )}
                        </div>

                        {/* content */}
                        <div className="p-4 flex flex-col gap-3">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm md:text-base font-semibold text-gray-900 truncate">
                                        {item.title}
                                    </h3>
                                    {item.brand && (
                                        <p className="text-xs text-gray-500 truncate">{item.brand}</p>
                                    )}
                                </div>

                                <div className="text-right">
                                    <div className="flex items-baseline gap-2 justify-end">
                                        {/* <span className="text-lg font-bold text-gray-900">₹{discountedPrice}</span> */}
                                        {item.discountPercentage ? (
                                            <span className="text-xs line-through text-gray-400">₹{item.price}</span>
                                        ) : null}
                                    </div>
                                    {item.discountPercentage ? (
                                        <div className="text-xs text-green-700 font-medium mt-0.5">
                                            {item.discountPercentage}% off
                                        </div>
                                    ) : null}
                                </div>
                            </div>

                            <p className="text-xs text-gray-600 line-clamp-2">{item.description}</p>

                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    {/* rating */}
                                    <div className="flex items-center gap-1">
                                        <StarIcon/>
                                        <span className="text-sm font-medium text-gray-700">
                                            {item.rating ? item.rating.toFixed(1) : "—"}
                                        </span>
                                    </div>

                                    {/* stock */}
                                    <div className={`text-sm font-medium ${item.stock && item.stock > 0 ? "text-green-600" : "text-red-500"}`}>
                                        {item.stock && item.stock > 0 ? `${item.stock} in stock` : "Out of stock"}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        // onClick={() => onView && onView(item)}
                                        className="px-3 py-1.5 text-xs border rounded-lg bg-white hover:bg-gray-50">
                                        View
                                    </button>

                                    <button
                                        // onClick={() => onAdd && onAdd(item)}
                                        disabled={!item.stock || item.stock <= 0}
                                        className={`px-3 py-1.5 text-xs rounded-lg font-medium transition ${item.stock && item.stock > 0
                                            ? "bg-blue-600 text-white hover:bg-blue-700"
                                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                                            }`}
                                    >
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UseEffectprc
