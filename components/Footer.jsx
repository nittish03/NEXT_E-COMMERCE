"use client";
import React, { useEffect, useState } from 'react';
import { FaLinkedin, FaTwitter, FaInstagram, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt, FaArrowUp } from "react-icons/fa";
import { VscGithub } from "react-icons/vsc";
import { MdEmail, MdLocationOn, MdPhone, MdSecurity } from "react-icons/md";
import { BsShieldCheck, BsCreditCard, BsTruck } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { RiCustomerService2Line } from "react-icons/ri";
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/logo.png';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Show scroll to top button when scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Mouse tracking for 3D effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Size Guide', href: '/size-guide' },
    { name: 'Shipping Info', href: '/shipping' },
    { name: 'Returns', href: '/returns' },
  ];

  const categories = [
    { name: 'New Arrivals', href: '/new-arrivals' },
    { name: 'Best Sellers', href: '/best-sellers' },
    { name: 'Sale Items', href: '/sale' },
    { name: 'Gift Cards', href: '/gift-cards' },
    { name: 'Accessories', href: '/accessories' },
    { name: 'Brands', href: '/brands' },
  ];

  const socialLinks = [
    { icon: VscGithub, href: 'https://github.com/nittish03', color: 'hover:text-gray-800', bgColor: 'hover:bg-gray-100' },
    { icon: FaLinkedin, href: 'https://linkedin.com/in/nittish03', color: 'hover:text-blue-600', bgColor: 'hover:bg-blue-100' },
    { icon: FaTwitter, href: 'https://twitter.com', color: 'hover:text-blue-400', bgColor: 'hover:bg-blue-50' },
    { icon: FaInstagram, href: 'https://instagram.com', color: 'hover:text-pink-600', bgColor: 'hover:bg-pink-50' },
    { icon: FaYoutube, href: 'https://youtube.com', color: 'hover:text-red-600', bgColor: 'hover:bg-red-50' },
  ];

  const trustFeatures = [
    { icon: BsShieldCheck, text: 'Secure Shopping', subtext: '256-bit SSL' },
    { icon: BsCreditCard, text: 'Safe Payment', subtext: 'Multiple Options' },
    { icon: BsTruck, text: 'Fast Delivery', subtext: 'Free Shipping' },
    { icon: RiCustomerService2Line, text: '24/7 Support', subtext: 'Always Here' },
  ];

  return (
    <>
      {/* Scroll to Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full shadow-2xl hover:shadow-blue-500/25 transform hover:scale-110 transition-all duration-300 group"
          style={{
            transform: `scale(${isVisible ? 1 : 0}) perspective(1000px) rotateX(${(mousePosition.y - window.innerHeight / 2) * 0.01}deg)`,
          }}
        >
          <FaArrowUp size={20} className="group-hover:animate-bounce" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500 -z-10"></div>
        </button>
      )}

      {/* Main Footer */}
      <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Newsletter Section */}
        <div className="relative border-b border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-12">
            <div className="text-center max-w-4xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Stay in the Loop
              </h3>
              <p className="text-gray-300 mb-8 text-lg">
                Subscribe to get special offers, free giveaways, and exclusive deals
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                  <MdEmail className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 group relative overflow-hidden"
                >
                  <span className="relative z-10">Subscribe</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="relative container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-6">
              <div className="flex items-center group cursor-pointer">
                <div className="relative transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <Image 
                    src={logo} 
                    alt="E-Commerce Logo" 
                    width={60} 
                    height={60} 
                    className="transition-all duration-500 group-hover:drop-shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                </div>
                <h2 className="ml-4 text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  E-Commerce
                </h2>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                Your ultimate destination for fashion. We bring you the latest trends with uncompromising quality and exceptional service.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center text-gray-300 hover:text-white transition-colors duration-300">
                  <MdLocationOn className="mr-3 text-blue-400" size={20} />
                  <span>123 Fashion Street, Style City, SC 12345</span>
                </div>
                <div className="flex items-center text-gray-300 hover:text-white transition-colors duration-300">
                  <MdPhone className="mr-3 text-green-400" size={20} />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center text-gray-300 hover:text-white transition-colors duration-300">
                  <MdEmail className="mr-3 text-purple-400" size={20} />
                  <span>hello@ecommerce.com</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white relative">
                Quick Links
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href} 
                      className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300 mr-0 group-hover:mr-3"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white relative">
                Categories
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-purple-400 transition-all duration-300 mr-0 group-hover:mr-3"></span>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/Men" className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-purple-400 transition-all duration-300 mr-0 group-hover:mr-3"></span>
                    Men's Collection
                  </Link>
                </li>
                <li>
                  <Link href="/Women" className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-purple-400 transition-all duration-300 mr-0 group-hover:mr-3"></span>
                    Women's Collection
                  </Link>
                </li>
                <li>
                  <Link href="/Kids" className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-purple-400 transition-all duration-300 mr-0 group-hover:mr-3"></span>
                    Kids Collection
                  </Link>
                </li>
                {categories.slice(0, 2).map((category, index) => (
                  <li key={index}>
                    <Link 
                      href={category.href} 
                      className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-purple-400 transition-all duration-300 mr-0 group-hover:mr-3"></span>
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust Features */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white relative">
                Why Choose Us
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-pink-500 to-red-500"></div>
              </h3>
              <div className="space-y-4">
                {trustFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-300 group cursor-pointer">
                    <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="text-blue-400 group-hover:text-white transition-colors duration-300" size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">{feature.text}</p>
                      <p className="text-sm text-gray-400">{feature.subtext}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="relative border-t border-white/10 bg-black/30 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-8">
            {/* Social Media Links */}
            <div className="flex justify-center items-center mb-8">
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-white/10 backdrop-blur-sm rounded-full ${social.color} ${social.bgColor} transform hover:scale-110 hover:rotate-12 transition-all duration-300 group relative overflow-hidden`}
                  >
                    <social.icon size={24} className="relative z-10 transition-transform duration-300 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Decorative Line */}
            <div className="flex justify-center items-center mb-8">
              <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            </div>

            {/* Copyright */}
            <div className="text-center">
              <p className="text-gray-400 text-sm flex items-center justify-center">
                &copy; 2025 E-Commerce. Made with 
                <AiOutlineHeart className="mx-2 text-red-500 animate-pulse" size={16} />
                by Nittish. All Rights Reserved.
              </p>
              <div className="mt-4 flex justify-center items-center space-x-6 text-xs text-gray-500">
                <Link href="/privacy" className="hover:text-white transition-colors duration-300">Privacy Policy</Link>
                <span>•</span>
                <Link href="/terms" className="hover:text-white transition-colors duration-300">Terms of Service</Link>
                <span>•</span>
                <Link href="/cookies" className="hover:text-white transition-colors duration-300">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  );
}

export default Footer;
