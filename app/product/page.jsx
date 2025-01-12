"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { products } from "../../public/assets/assets";
import CCarousel from "@/components/CCarousel";
import Link from "next/link";

// Suspense component used to manage async loading
const PageContent = () => {
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");
  const product = products.find((product) => product._id === id);
  const filteredProducts = products.filter((e) => e.category === product?.category);

  const [selectedImage, setSelectedImage] = useState(product?.image[0]);

  return (
    <div className="bg-white min-h-screen p-6">
      {/* Breadcrumb Navigation */}
      <nav className="mb-4 text-sm text-gray-600">
        <ul className="flex items-center space-x-2">
          <li><Link href="/" className="hover:underline">HOME</Link></li>
          <li>/</li>
          <li><Link href="/shop/kid" className="hover:underline">{product?.category}</Link></li>
          <li>/</li>
          <li className="font-semibold">{product?.name}</li>
        </ul>
      </nav>

      <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl mx-auto p-8 flex flex-col md:flex-row gap-8">
        {/* Image Section */}
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="flex justify-center items-center space-x-4">
            <div className="flex flex-col space-y-2">
              {product?.image.map((img, index) => (
                <Image
                  key={index}
                  className={`w-20 h-20 object-contain rounded-md cursor-pointer border ${selectedImage === img ? "border-blue-500" : "border-transparent"}`}
                  src={img}
                  alt={`Product Image ${index + 1}`}
                  width={80}
                  height={80}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
            <Image
              className="rounded-lg shadow-md h-[180%]"
              src={selectedImage}
              alt={product?.name}
              width={400}
              height={400}
            />
          </div>
        </div>

        {/* Product Info Section */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{product?.name}</h1>

          {/* Rating and Reviews */}
          <div className="flex items-center mb-4">
            <div className="flex text-orange-400 space-x-1">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>☆</span>
            </div>
            <span className="ml-2 text-sm text-gray-500">122 reviews</span>
          </div>

          {/* Price Section */}
          <div className="mb-4">
            <span className="text-lg text-gray-500 line-through mr-2">₹{product?.oldPrice}</span>
            <span className="text-2xl text-red-600 font-bold">₹{product?.price}</span>
          </div>

          <p className="text-gray-600 mb-6">{product?.description}</p>

          {/* Size Selection */}
          <div className="mb-6">
            <span className="block text-gray-700 font-semibold mb-2">Select Size</span>
            <div className="flex space-x-4">
              {product?.sizes.map((size) => (
                <button key={size} className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100">
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition duration-300">
            ADD TO CART
          </button>

          {/* Category & Tags */}
          <div className="mt-6">
            <div className="flex items-center mb-2">
              <span className="font-semibold text-gray-700">Category:</span>
              <span className="ml-2 text-gray-600">{product?.category}</span>
            </div>
          </div>
        </div>
      </div>
      <CCarousel prod={filteredProducts} category={"Related"} />
    </div>
  );
};

const Page = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <PageContent />
  </Suspense>
);

export default Page;
