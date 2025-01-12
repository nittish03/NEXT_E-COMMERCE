'use client'
import React from 'react'
import {products} from '../../public/assets/assets'
import Link from "next/link";
import Image from 'next/image';
import banner_women from '@/public/banner_women.png'
import CCarousel from '../../components/CCarousel';
import "react-multi-carousel/lib/styles.css";
import Products from '@/components/Products'

const womenProducts = products.filter(product => product.category === "Women");


const page = () => {
    
  return (
    <>
                    <div>
                      <Image
                        src={banner_women}
                        alt="Woen's Fashion"
                        className="w-full h-60 object-cover"
                      />
                    </div>
<CCarousel prod={womenProducts}/>
<Products prod={womenProducts}/>
</>
  )
}

export default page

