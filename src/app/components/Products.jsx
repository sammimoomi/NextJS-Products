"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

function ProductsData() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    console.log("Data from state: ", products)

    useEffect(() => {
        setLoading(true);
        const fetchProductsData = async () => {
            try {
                const response = await fetch("https://dummyjson.com/products/");
                const productsData = await response.json();

                setProducts(productsData.products)
                console.log(productsData)


            }catch(error){
                console.log(error)
            }
            setLoading(false);

        }
        fetchProductsData();
    }, [])

  return (
    <div className='container  mx-auto'>
        {loading ? (
            <p>Loading...</p>
        ) : (
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center">Customers also purchased</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((val, index) => (
                    <div key={val.id} className="group relative">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                        <Image
                            src={val.thumbnail}
                            alt={val.title}
                            width={300} height={300}
                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                        </div>
                        <div className="mt-4 flex justify-between">
                        <div>
                            <h3 className="text-sm text-gray-700">
                            <Link key={val.name} href={`/product/[id]`} as={`/product/${index + 1}`}>
                                <span aria-hidden="true" className="absolute inset-0" />
                                {val.title}
                            </Link>
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">brand : {val.brand}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">{val.price}</p>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
                </div>
        )}
    </div>
    
  )
}

export default ProductsData