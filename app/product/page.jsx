"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { products } from "../../public/assets/assets";

const page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Access the "id" query parameter
  const product = products.find((product) => product._id === id);
  // console.log(product.image[0])

  return (
    <div className=" border-2 mx-10 bg-[#dcd4d4] text-black flex content-center items-center p-2 gap-6 h-[80vh]">
      <div className="w-50% h-100% ">
        <Image
          className=" w-[600px] rounded-xs"
          src={product.image[0]}
          alt="image"
        ></Image>
      </div>
      <div className="flex justify-center border-2 bg-[#dedcdc] items-start  gap-8 p-6 flex-col w-96 ">
        <h1 className="font-extrabold text-xl underline-offset-8 text-[#000000]">{product.name}</h1>
        <h1 className="text-sm">{product.description}</h1>
        <div className="flex justify-center items-center gap-8">
        <button className="bg-blue-600 p-2 text-white rounded-sm">
            Add to Cart
          </button>
          <h1 className="text-[#279d33]">Price : ₹{product.price}</h1>

        </div>
        <div className="flex items-center justify-center gap-4 text-sm">
          <div className="flex justify-center items-center">
    
            <p className="font-bold">Category : </p>{" "}{product.category}
          </div>
          <div className="flex justify-center items-center">
    
    <p className="font-bold">Sub-Category : </p>{" "}{product.subCategory}
  </div>

        </div>
      </div>
    </div>
  );
};

export default page;
