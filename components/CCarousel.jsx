'use client'
import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from 'next/link'
import Image from 'next/image'
const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1280 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1280, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
    },
  };
const CCarousel = ({prod}) => {
  return (
    <div>  <div className="bg-[#f8f8f8]">
    <div className="min-h-screen mx-4 lg:mx-10 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">{prod[0].category} Products</h2>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        showDots={false}
        customTransition="all 0.5s"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {prod.map((e, index) => (
          <div key={index} className="px-4 py-5">
            <Link href={`/product?id=${e._id}`}>
              <div className="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-xl">
                {/* Image */}
                <div className="h-64 w-full relative overflow-hidden rounded-lg">
                  <Image
                    src={e.image[0].src}
                    alt={e.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
  
                {/* Text Content */}
                <div className="text-center mt-4">
                  <p className="text-base font-semibold text-[#333333]">{e.name}</p>
                </div>
  
                {/* Price Section */}
                <div className="mt-2 flex flex-col justify-center items-center text-center">
                  <div className='flex justify-between items-center w-full'>
                    <p className="text-lg font-bold text-red-500">₹{e.price}</p>
                    <p className="text-sm text-gray-500 line-through">₹{e.oldPrice}</p>
                  </div>
                  <div className='flex justify-center items-center'>
                    <p className="text-sm text-black">{e.category}</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  </div></div>
  )
}

export default CCarousel