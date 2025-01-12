import React from 'react'
import { FaShoppingBag } from "react-icons/fa";
import { LuInstagram } from "react-icons/lu";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { VscGithub } from "react-icons/vsc";
import Image from 'next/image'
import Link from 'next/link'
import logo from '@/public/logo.png'

const Footer = () => {
    return (
        <div className='bg-[#d3d1d1] mt-10'>
        <div className='flex justify-center items-center'>
          <p className="w-[90%]  h-[4px] my-10 bg-black"></p>
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
          <div className="flex justify-center items-center gap-6">
            <a href="https://github.com/nittish03" target='_blank' className="hover:scale-110 transition-transform ease-in-out duration-300">
            <VscGithub   className='h-10 w-10 text-black'/>
            </a>
            <a href="https://github.com/nittish03" target='_blank' className="hover:scale-110 transition-transform ease-in-out duration-300">
            <FaLinkedin   className='h-10 w-10 text-[#2966ff]'/>
            </a>
          </div>
          <div className="footer-copyright">
          <div className="w-[60%]  h-[4px] my-10 bg-black"></div>
            <p>Copyright @ 2025 - All Right Reserved.</p>
          </div>
        </div>
        </div>

      )
}

export default Footer