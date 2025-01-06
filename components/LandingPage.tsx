
"use client"
import React from 'react'
import Home from './Home'
import Products from './Products'


// _id: "aaaaa",
// name: "Women Round Neck Cotton Top",
// description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
// price: 100,
// image: [p_img1],
// category: "Women",
// subCategory: "Topwear",
// sizes: ["S", "M", "L"],
// date: 1716634345448,
// bestseller: true


const LandingPage = () => {


  return (
    <div className='bg-[#c2bfbf]'>
<Home/>
<Products/>


    </div>
  )
}

export default LandingPage