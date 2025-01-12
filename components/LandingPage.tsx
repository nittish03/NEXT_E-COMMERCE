
"use client"
import React from 'react'
import Products from '@/components/Products'
import Link from 'next/link'
import { products } from '@/public/assets/assets'
import CCarousel from '@/components/CCarousel'
import hero from '../public/assets/hero_img.png'
import Image from 'next/image'
import exclusive from '@/public/exclusive_image.png'



const LandingPage = () => {


  return (
    <div>
<Home/>
<CCarousel prod={products}/>
<Exclusive/>
<Products prod={products.slice(0,10)}/>
<Subscribe/>


    </div>
  )
}

export default LandingPage


const Home = () => {
  return (
    <div className='bg-[#f6f6f6]'> {/* Soft light background color */}
      {/* Hero Section */}
      <div className='flex justify-center items-center  mt-8 mx-6 p-8 border-2 border-[#d4d4d4] rounded-lg'>
        <div className='flex justify-between items-center w-full max-w-screen-xl'>
          {/* Left Side (Text) */}
          <div className='flex flex-col items-start'>
            {/* Subheading with border */}
            <div className='flex items-center justify-start gap-2 mb-6'>
              <p className='w-12 sm:w-16 h-[2px] bg-[#333]'></p>
            </div>
            {/* Text with hover effect */}
            <p className='font-medium text-base sm:text-lg text-[#555] hover:text-[#FF6F61] transition duration-300'>
              OUR BESTSELLERS
            </p>
            {/* Main Heading with hover effect and smooth transition */}
            <h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#333] tracking-tight leading-tight mb-6 hover:text-[#FF6F61] transform transition-all duration-500 ease-in-out'>
              Latest Arrivals
            </h1>
            {/* Subheading with more styling */}
            <div className='flex justify-start items-center gap-2'>
              <p className='font-semibold text-base sm:text-lg text-[#333] uppercase hover:text-[#FF6F61] transition duration-300'>
                SHOP NOW
              </p>
              <p className='w-10 sm:w-12 h-[2px] bg-[#333]'></p>
            </div>
          </div>

          {/* Right Side (Image) */}
          <div className='relative w-full max-w-md'>
            <Image
              className='object-cover rounded-lg shadow-lg'
              src={hero}
              alt="hero image"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>


    </div>
  )
}

const Subscribe = () => {
  return (
  <>
  <div className='flex justify-center items-center'>
              <p className="w-[100%]  h-[4px] my-10 bg-black"></p>
  </div>

    <div className="flex justify-center items-center  bg-gray-50">
      <div className="bg-gray-100 my-5 rounded-lg shadow-lg p-8 max-w-2xl w-full">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">
          Get Exclusive Offers On Your Email
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Subscribe to our newsletter and stay updated
        </p>

        {/* Input and Button */}
        <div className="flex items-center justify-center">
          <input
            type="email"
            placeholder="Your Email id"
            className="flex-grow p-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-r-lg transition-all">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  </>

  );
};

const Exclusive = () => {
  return (
    <>
    
    <div className='bg-[#f6f6f6]'> {/* Soft light background color */}
      {/* Hero Section */}
      <div className='flex justify-center items-center  mt-8 mx-6 p-8 border-2 border-[#d4d4d4] rounded-lg'>
        <div className='flex justify-between items-center w-full max-w-screen-xl'>
          {/* Left Side (Text) */}
          <div className='flex flex-col items-start'>
            {/* Subheading with border */}
            <div className='flex items-center justify-start gap-2 mb-6'>
              <p className='w-12 sm:w-16 h-[2px] bg-[#FF6F61]'></p>
            </div>

            {/* Main Heading with hover effect and smooth transition */}
            <h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#333] tracking-tight leading-tight  hover:text-[#FF6F61] transform transition-all duration-500 ease-in-out'>
              Exclusive
            </h1>
            <h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#333] tracking-tight leading-tight mb-6 hover:text-[#FF6F61] transform transition-all duration-500 ease-in-out'>
              Offers For You
            </h1>
            {/* Subheading with more styling */}
            <div className='flex justify-start items-center gap-2'>
              <p className='font-semibold text-base sm:text-lg text-[#333] uppercase hover:text-[#FF6F61] transition duration-300'>
              ONLY ON BEST SELLERS PRODUCTS
              </p>

            </div>
            {/* Button with gradient effect */}
            <button className='px-10 py-2 mt-5 text-base sm:text-lg font-semibold tracking-tight text-white transition duration-300 bg-[#FF6F61] hover:bg-[#D43F3A] rounded-lg'>
              SHOP NOW
            </button>
          </div>

          {/* Right Side (Image) */}
          <div className='relative w-full max-w-md '>
            <Image
              className='object-cover shadow-lg w-[5000px] rounded-lg '
              src={exclusive}
              alt="hero image"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>


    </div>
    </>
  )
}

