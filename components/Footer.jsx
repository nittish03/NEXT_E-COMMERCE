import React from 'react';
import { FaLinkedin } from "react-icons/fa";
import { VscGithub } from "react-icons/vsc";
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/logo.png';

const Footer = () => {
  return (
    <>
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-10">
    <div className='flex justify-center items-center'>
    <p className="w-[90%]  h-[4px] my-10 bg-black"></p>
  </div>
      <div className="container mx-auto px-6">
        <div className="flex justify-center items-center mb-10">
          <div className="w-full max-w-2xl">
            <div className="flex items-center justify-center mb-6">
              <Image src={logo} alt="logo" width={50} height={50} />
              <p className="text-xl font-extrabold ml-3 text-orange-600">SHOPPER</p>
            </div>
            <ul className="flex justify-center space-x-8 text-gray-600 text-sm mb-6">
              <li>
                <Link href="/" className="hover:text-orange-600 transition-colors duration-300">Home</Link>
              </li>
              <li>
                <Link href="/Men" className="hover:text-orange-600 transition-colors duration-300">Men</Link>
              </li>
              <li>
                <Link href="/Women" className="hover:text-orange-600 transition-colors duration-300">Women</Link>
              </li>
              <li>
                <Link href="/Kids" className="hover:text-orange-600 transition-colors duration-300">Kids</Link>
              </li>
            </ul>
            <div className="flex justify-center items-center gap-6 mb-6">
              <Link href="https://github.com/nittish03" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform ease-in-out duration-300">
                <VscGithub className="h-8 w-8 text-gray-800 hover:text-orange-600 transition-colors duration-300" />
              </Link>
              <Link href="https://linkedin.com/in/nittish03" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform ease-in-out duration-300">
                <FaLinkedin className="h-8 w-8 text-blue-700 hover:text-orange-600 transition-colors duration-300" />
              </Link>
            </div>
            <div className='flex justify-center items-center'>
    <p className="w-[90%]  h-[4px] my-10 bg-black"></p>
  </div>
            <div className="flex justify-center items-center">
              <p className="text-gray-500 text-sm">&copy; 2025 SHOPPER - All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    </>

  );
}

export default Footer;
