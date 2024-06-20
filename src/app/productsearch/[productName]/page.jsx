"use client"

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { StarIcon } from '@heroicons/react/20/solid';
import Link from 'next/link'
import Image from 'next/image'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function productSearch() {

  const params = useParams();

const [productData, setProductData] = useState([]);
const [loading, setLoading] = useState(false);

console.log(productData)

const fetchProductData = async () => {
    try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products/search?q=${params.productName}`)
        const data = await response.json();
        setProductData(data.products);
        setLoading(false);
    } catch(error) {
        console.log(error)
    }
}

useEffect(() => {
    fetchProductData();
}, [])

  return (
<div className='p-24'>
<Link href="/" className='bg-blue-500 text-white p-3 rounded-md'>Go Back</Link>

<div className="bg-white">
         <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-5xl">NextJS Products Search</h2>
        </div>

        {productData.map(product => (
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
        <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center ">
              <div className="mx-auto max-w-xs px-2">
                <Image
                    src={product.thumbnail}
                    alt={product.title}
                    width={500} height={500}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">${product.price}</span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
                </p>
                <a
                  href="#"
                  className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get access
                </a>
                <p className="mt-6 text-xs leading-5 text-gray-600">
                  Invoices and receipts available for easy company reimbursement
                </p>
              </div>
            </div>
          </div>
          <div className="p-8 sm:p-8 lg:flex-auto">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 text-center">{product.title}</h1>
            <p className="mt-6 text-base leading-7 text-gray-600">{product.description}</p>
            <div className="mt-10 flex items-center gap-x-4">
              <p className='my-3'>
                    tags:{" "}
                    {product.tags?.map((tag, index) => (
                        <span key={index} className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 mr-2">
                              {tag} 
                            </span>
                    ))}
                </p>
              
            </div>
            <div className="h-px flex-auto  py-5" />
            <ul role="list" className="divide-y divide-gray-100">
                {product.reviews?.map((review,index) => (
                    <li key={review.reviewerEmail} className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                        <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{review.comment}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{review.reviewerName}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{review.reviewerEmail}</p>
                        </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">Rating : {review.rating}</p>
                        {/* Reviews */}
                    <div className="mt-1">
                        <h3 className="sr-only">Reviews</h3>
                        <div className="flex items-center">
                        <div className="flex items-center">
                            {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                                key={rating}
                                className={classNames(
                                review.rating > rating ? 'text-gray-900' : 'text-gray-200',
                                'h-5 w-5 flex-shrink-0',
                                )}
                                aria-hidden="true"
                            />
                            ))}
                        </div>

                        </div>
                        </div>


                    </div>
                    </li>
                 ))} 
                </ul>
          </div>
        </div>

))}


      </div>
    </div>
    </div>
      </div>
    
  )
}

export default productSearch