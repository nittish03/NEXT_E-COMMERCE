'use client'
import React from 'react'
import {products} from '../../public/assets/assets'
import Link from "next/link";
import Image from 'next/image';
import banner_mens from "@/public/banner_mens.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CCarousel from '../../components/CCarousel';
import Products from '@/components/Products'

const menProducts = products.filter(product => product.category === "Men");

const page = () => {


  return (
<>
<div>
  <Image
    src={banner_mens}
    alt="Men's Fashion"
    className="w-full h-60 object-cover"

  />
</div>
<CCarousel prod={menProducts} category={menProducts[0].category}/>
<Products prod={menProducts}/>


  </>

  )
}

export default page


