import React from 'react'
import Link from 'next/link'


const Products = ({prod}) => {
  return (
    <div>
          <div className="p-6">
    {/* Header */}
    <h2 className="text-3xl font-bold text-center mb-4">New Collections</h2>
    <div className="flex justify-center mb-6">
      <div className="h-1 w-16 bg-red-500"></div>
    </div>

    {/* Products Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {prod.map((product, index) => (
                        <Link      key={index} href={`/product?id=${product._id}`}>

        <div
     
          className="border rounded-lg shadow-md hover:shadow-lg transition-transform p-4 px-4 hover:scale-105 duration-300 ease-in-out flex flex-col items-center bg-white"
        >
          {/* Product Image */}
          <div className="w-full h-50 mb-4 flex items-center justify-center overflow-hidden">
            <img
              src={product.image[0].src}
              alt={product.name}
              className="h-full object-contain transition-transform duration-300 ease-in-out transform hover:scale-105"
            />
          </div>
          {/* Product Name */}
          <h3 className="md:text-base text-xs font-semibold text-center mb-2">
            {product.name}
          </h3>
          {/* Pricing */}
          <div className="flex justify-between w-full items-center">
            <span className="text-xl text-red-500 font-bold">
            ₹{product.price}
            </span>
            <span className="text-base text-gray-400 line-through">
            ₹{product.oldPrice}
            </span>
          </div>
        </div>
        </Link>
      ))}
    </div>
  </div>
    </div>
  )
}

export default Products