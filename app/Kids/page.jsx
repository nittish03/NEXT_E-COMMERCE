import React from 'react'
import {products} from '../../public/assets/assets'
import Link from "next/link";
import Image from 'next/image';

const page = () => {
    const filteredProducts = products.filter(product => product.category === "Kids");
  return (
    <div>
    <div className="min-h-screen  mt-10 mx-10 flex justify-center items-center">
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
  {filteredProducts.map((e, index) => (
    <Link 
    key={index}
     href={`/product?id=${e._id}`}>
    <div key={index} className="bg-white shadow-md rounded-lg p-3">
      {/* Image */}
      <div className="h-48 w-full overflow-hidden">
        <Image
        width={100}
        height={100}
          src={e.image[0].src}
          alt="product"
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      
      {/* Text Content */}
      <div className="mt-2 text-center">
        <p className="text-sm font-medium text-gray-800">{e.name}</p>
        <p className="text-xs text-gray-600 mt-1">{e.description}</p>
      </div>
      
      {/* Price and Category */}
      <div className="mt-2 text-center">
        <p className="text-sm font-semibold text-gray-900">₹{e.price}</p>
        <p className="text-xs text-gray-500">{e.category}</p>
      </div>
    </div>
    </Link>
  ))}
</div>
</div>
</div>
  )
}

export default page