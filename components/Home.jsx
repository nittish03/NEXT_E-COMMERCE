'use client'

import React from 'react'
import hero from '../public/assets/hero_img.png'
import {assets, products} from '../public/assets/assets'
import Image from 'next/image'



const Home = () => {
  return (
    <div className='bg-[#c2bfbf]'>
        <div className='flex justify-center  items-center mb-20 border-2 mx-20 mt-6  p-6 border-gray-600'>
    <div className='flex justify-center items-center flex-col'>
    <div className='flex items-center justify-center gap-2'>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
          </div>
          <p className='font-medium text-sm md:text-base   text-[#4a4a4a] hover:text-[#ff5733] transition duration-300'>OUR BESTSELLERS</p>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#333333] tracking-tight hover:text-[#ff5733] transform transition-all duration-500 ease-in-out'>
            Latest Arrivals
          </h1>
          <div className='flex items-center gap-2'>
            <p className='font-semibold text-sm md:text-base text-[#414141] uppercase hover:text-[#ff5733] transition duration-300'>
              SHOP NOW
            </p>
            <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
          </div>
  
    </div>
    <div className='flex justify-center items-center aspect-video'>
   <Image className='h-96 w-full' src={hero} width={100} height={100} alt="hero"/>
    </div>
  </div></div>
  )
}

export default Home