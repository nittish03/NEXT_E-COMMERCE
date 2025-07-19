"use client"
import React, { useState, useEffect } from 'react'
import Products from '@/components/Products'
import Link from 'next/link'
import { products } from '@/public/assets/assets'
import CCarousel from '@/components/CCarousel'
import hero from '../public/assets/hero_img.png'
import Image from 'next/image'
import exclusive from '@/public/exclusive_image.png'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { FaArrowRight, FaStar, FaShippingFast, FaShieldAlt, FaHeadset, FaGift, FaFire, FaHeart, FaTruck, FaLock } from 'react-icons/fa'
import { MdEmail, MdLocalShipping, MdSecurity, MdSupport } from 'react-icons/md'
import { BsArrowRight, BsStarFill, BsLightning, BsTruck, BsShieldCheck } from 'react-icons/bs'
import { useRef } from 'react'

const LandingPage = () => {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, 100])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])

  return (
    <div className="overflow-hidden">
      <motion.div
        style={{ y: y1 }}
        className="relative"
      >
        <Home />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <CCarousel prod={products} category={"Explore"} />
      </motion.div>

      <motion.div
        style={{ y: y2 }}
        className="relative"
      >
        <Exclusive />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <Products prod={products.slice(0, 10)} />
      </motion.div>

      <Subscribe />
    </div>
  )
}

export default LandingPage

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 relative overflow-hidden pt-20'>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x * 0.02,
            top: mousePosition.y * 0.02,
          }}
        />
        <div 
          className="absolute w-64 h-64 bg-gradient-to-r from-pink-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse animation-delay-2000"
          style={{
            right: mousePosition.x * 0.01,
            bottom: mousePosition.y * 0.01,
          }}
        />
      </div>

      {/* Hero Section */}
      <div className='container mx-auto px-6 py-16' ref={ref}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className='bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 md:p-12 mx-auto max-w-7xl'
        >
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            {/* Left Side (Text) */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='space-y-8'
            >
              {/* Animated Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className='inline-flex items-center gap-3 bg-gradient-to-r from-orange-500/10 to-red-500/10 backdrop-blur-sm px-6 py-3 rounded-full border border-orange-200'
              >
                <FaFire className="text-orange-500 animate-pulse" />
                <span className='text-sm font-semibold text-orange-600 uppercase tracking-wide'>
                  Our Bestsellers
                </span>
                <div className='w-12 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full' />
              </motion.div>

              {/* Main Heading with Gradient Text */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h1 className='text-5xl md:text-7xl font-black leading-tight'>
                  <span className='bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent hover:from-orange-600 hover:to-red-600 transition-all duration-1000 cursor-default'>
                    Latest
                  </span>
                  <br />
                  <span className='bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient'>
                    Arrivals
                  </span>
                </h1>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className='text-xl text-gray-600 leading-relaxed max-w-md'
              >
                Discover the most trendy and stylish collection crafted just for you. Premium quality meets modern design.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className='flex flex-col sm:flex-row gap-4'
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(79, 70, 229, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className='group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden'
                >
                  <span className="relative z-10">Shop Now</span>
                  <BsArrowRight className="group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='px-8 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-2xl hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-3'
                >
                  View Collection
                  <FaArrowRight className="text-sm" />
                </motion.button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1 }}
                className='flex flex-wrap gap-6 pt-8 border-t border-gray-200'
              >
                {[
                  { icon: FaShippingFast, text: "Free Shipping" },
                  { icon: FaShieldAlt, text: "Secure Payment" },
                  { icon: FaHeadset, text: "24/7 Support" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-600">
                    <item.icon className="text-blue-500" />
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side (Image) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className='relative'
            >
              <div className="relative group">
                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
                
                {/* Main Image */}
                <motion.div
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10"
                >
                  <Image
                    className='object-cover rounded-3xl shadow-2xl w-full h-auto'
                    src={hero}
                    alt="Latest Fashion Collection"
                    width={600}
                    height={600}
                    priority
                  />
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4  z-50 bg-white rounded-2xl p-4 shadow-xl border border-gray-100"
                >
                  <div className="flex items-center gap-2">
                    <BsStarFill className="text-yellow-400" />
                    <span className="font-bold text-gray-800">4.9</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">1000+ Reviews</p>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 bg-gradient-to-r  z-50 from-green-500 to-blue-500 text-white rounded-2xl p-4 shadow-xl"
                >
                  <div className="flex items-center gap-2">
                    <FaTruck />
                    <span className="font-bold text-sm">Free Delivery</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

const Subscribe = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const handleSubscribe = (e) => {
    e.preventDefault()
    setIsSubscribed(true)
    setTimeout(() => setIsSubscribed(false), 3000)
    setEmail('')
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
      </div>

      <div className="relative container mx-auto px-6 py-20" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                Get Exclusive
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Offers & Updates
              </span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Join our community of fashion enthusiasts and be the first to know about new arrivals, exclusive deals, and style tips.
            </p>
          </motion.div>

          {/* Subscription Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            onSubmit={handleSubscribe}
            className="max-w-lg mx-auto mb-12"
          >
            <div className="relative">
              <div className="flex bg-white/10 backdrop-blur-xl rounded-2xl p-2 border border-white/20">
                <div className="relative flex-1">
                  <MdEmail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-4 bg-transparent text-white placeholder-gray-400 focus:outline-none rounded-xl"
                    required
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isSubscribed}
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 flex items-center gap-3 disabled:opacity-50"
                >
                  {isSubscribed ? (
                    <>
                      <FaHeart className="animate-pulse" />
                      Subscribed!
                    </>
                  ) : (
                    <>
                      Subscribe
                      <FaArrowRight />
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.form>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: FaLock,
                title: "100% Secure",
                description: "Your data is protected with us"
              },
              {
                icon: FaGift,
                title: "Exclusive Deals",
                description: "Get special offers and discounts"
              },
              {
                icon: BsLightning,
                title: "Instant Updates",
                description: "Be first to know about new arrivals"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-4">
                  <item.icon className="text-2xl text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

const Exclusive = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 relative overflow-hidden py-20'>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse animation-delay-2000" />
      </div>

      <div className='container mx-auto px-6' ref={ref}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className='bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 md:p-12 mx-auto max-w-7xl'
        >
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            {/* Left Side (Text) */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='space-y-8'
            >
              {/* Animated Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className='inline-flex items-center gap-3 bg-gradient-to-r from-red-500/10 to-pink-500/10 backdrop-blur-sm px-6 py-3 rounded-full border border-red-200'
              >
                <BsLightning className="text-red-500 animate-pulse" />
                <span className='text-sm font-semibold text-red-600 uppercase tracking-wide'>
                  Limited Time Offer
                </span>
                <div className='w-12 h-0.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full' />
              </motion.div>

              {/* Main Heading */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-4"
              >
                <h1 className='text-5xl md:text-7xl font-black leading-tight'>
                  <span className='bg-gradient-to-r from-red-600 via-orange-600 to-pink-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-red-600 transition-all duration-1000 cursor-default'>
                    Exclusive
                  </span>
                  <br />
                  <span className='bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent animate-gradient'>
                    Offers For You
                  </span>
                </h1>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className='text-xl text-gray-600 leading-relaxed uppercase tracking-wide font-semibold'
              >
                Only on Best Sellers Products
              </motion.p>

              {/* Offer Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-wrap gap-4"
              >
                {['Up to 70% OFF', 'Free Shipping', 'Easy Returns'].map((offer, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 backdrop-blur-sm rounded-full text-orange-600 font-semibold border border-orange-200"
                  >
                    {offer}
                  </span>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(239, 68, 68, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className='group px-12 py-5 bg-gradient-to-r from-red-500 to-pink-500 text-white font-black text-lg rounded-2xl shadow-2xl hover:shadow-red-500/25 transition-all duration-300 flex items-center gap-4 relative overflow-hidden'
              >
                <span className="relative z-10">Shop Now</span>
                <motion.div
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10"
                >
                  <FaArrowRight />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              </motion.button>
            </motion.div>

            {/* Right Side (Image) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className='relative'
            >
              <div className="relative group">
                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
                
                {/* Main Image */}
                <motion.div
                  whileHover={{ scale: 1.02, rotateY: -5 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10"
                >
                  <Image
                    className='object-cover rounded-3xl shadow-2xl w-full h-auto'
                    src={exclusive}
                    alt="Exclusive Fashion Offers"
                    width={600}
                    height={600}
                  />
                </motion.div>

                {/* Floating Discount Badge */}
                <motion.div
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-6 -left-6 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl p-6 shadow-2xl transform rotate-12"
                >
                  <div className="text-center">
                    <p className="text-3xl font-black">70%</p>
                    <p className="text-sm font-semibold">OFF</p>
                  </div>
                </motion.div>

                {/* Floating Timer Badge */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-2xl border border-gray-100"
                >
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Ends in</p>
                    <p className="text-xl font-black text-red-500">24:59:59</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Custom CSS for animations
const styles = `
  @keyframes gradient {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient 3s ease infinite;
  }
  
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  
  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
`

// Add styles to head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style")
  styleSheet.innerText = styles
  document.head.appendChild(styleSheet)
}
