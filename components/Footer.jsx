import React from 'react'
import { FaShoppingBag } from "react-icons/fa";
import { LuInstagram } from "react-icons/lu";
import { FaSquareWhatsapp } from "react-icons/fa6";
import Image from 'next/image'
import Link from 'next/link'
import logo from '@/public/logo.png'

const Footer = () => {
    return (
        <>
        <div className='flex justify-center items-center'>
          <div className="w-[90%]  h-[4px] my-10 bg-black"></div>
        </div>
          <div className='footer'>
          <div className="flex items-center justify-center">
          <Image src={logo} alt='logo'></Image>
            <p className='text-xl font-extrabold'>SHOPPER</p>
          </div>
          <ul className="footer-links">
            <Link href="/">Home</Link>
            <Link href="/Men">Men</Link>
            <Link href="/Women">Women</Link>
            <Link href="/Kids">Kids</Link>

          </ul>
          <div className="footer-social-icon">
            <div className="footer-icons-container">
            <LuInstagram   className='h-10 w-10'/>
            </div>
            <div className="footer-icons-container">
            <FaSquareWhatsapp className='h-10 w-10'/>
            </div>
          </div>
          <div className="footer-copyright">
          <div className="w-[60%]  h-[4px] my-10 bg-black"></div>
            <p>Copyright @ 2025 - All Right Reserved.</p>
          </div>
        </div>
        </>

      )
}

export default Footer