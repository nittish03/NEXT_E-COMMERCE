'use client'
import React from 'react';
import { products } from '../../public/assets/assets';
import Link from 'next/link';
import Image from 'next/image';
import banner_kids from '@/public/banner_kids.png';
import CCarousel from '../../components/CCarousel';
import Products from '@/components/Products';
const kidsProducts = products.filter(product => product.category === "Kids");

const Page = () => {  // Renamed to capitalize 'Page'

  return (
    <>
      <div>
        <Image
          src={banner_kids}
          alt="Men's Fashion"
          className="w-full h-60 object-cover"

        />
      </div>
<CCarousel prod={kidsProducts} category={kidsProducts[0].category}/>






<Products prod={kidsProducts}/>


    </>
  );
}

export default Page;

