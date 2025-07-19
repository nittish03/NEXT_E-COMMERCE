'use client'
import React, { useState, useRef } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FaHeart, FaShoppingCart, FaEye, FaArrowLeft, FaArrowRight, FaFire, FaStar } from 'react-icons/fa'
import { BsStarFill, BsHeartFill, BsCart3, BsArrowRight } from 'react-icons/bs'
import { MdAdd, MdFavorite } from 'react-icons/md'
import { HiSparkles } from 'react-icons/hi'
import { useAppContext } from "@/context";
import  { useRouter } from 'next/navigation';


const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1280 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 1280, min: 1024 },
    items: 3,
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

const CCarousel = ({ prod, category }) => {
  const router = useRouter();
  const { cartCount, setCartCount,addToCart} = useAppContext();
  const [favorites, setFavorites] = useState(new Set())
  const [hoveredProduct, setHoveredProduct] = useState(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const toggleFavorite = (productId, e) => {
    e.preventDefault()
    e.stopPropagation()
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId)
      } else {
        newFavorites.add(productId)
      }
      return newFavorites
    })
  }

  const calculateDiscount = (oldPrice, newPrice) => {
    return Math.round(((oldPrice - newPrice) / oldPrice) * 100)
  }

  // Custom Arrow Components
  const CustomLeftArrow = ({ onClick, ...rest }) => (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-xl border border-gray-200 flex items-center justify-center text-gray-700 hover:text-blue-600 hover:border-blue-300 transition-all duration-300 group"
    >
      <FaArrowLeft className="group-hover:animate-bounce" />
    </motion.button>
  )

  const CustomRightArrow = ({ onClick, ...rest }) => (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-xl border border-gray-200 flex items-center justify-center text-gray-700 hover:text-blue-600 hover:border-blue-300 transition-all duration-300 group"
    >
      <FaArrowRight className="group-hover:animate-bounce" />
    </motion.button>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-16 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-400/10 to-indigo-400/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
      </div>

      <div className="relative container mx-auto px-4 lg:px-8" ref={ref}>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm px-6 py-3 rounded-full border border-blue-200 mb-6"
          >
            <HiSparkles className="text-blue-500 animate-pulse" />
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
              Featured Collection
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-6xl font-black mb-6"
          >
            <span className="bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              {category} Products
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Handpicked selections featuring the finest quality and latest trends
          </motion.p>

          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
          />
        </motion.div>

        {/* Carousel Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative"
        >
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={4000}
            keyBoardControl={true}
            showDots={false}
            customTransition="transform 0.5s ease-in-out"
            transitionDuration={500}
            containerClass="carousel-container"
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
            removeArrowOnDeviceType={["tablet", "mobile"]}
            itemClass="px-3"
          >
            {prod.map((product, index) => {
              const discount = calculateDiscount(product.oldPrice, product.price)
              const isFavorite = favorites.has(product._id)
              const isHovered = hoveredProduct === product._id

              return (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100 
                  }}
                  className="h-full"
                  onMouseEnter={() => setHoveredProduct(product._id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <Link href={`/product?id=${product._id}`}>
                    <motion.div
                      whileHover={{ y: -10 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/50 h-full flex flex-col"
                    >
                      {/* Discount Badge */}
                      {discount > 0 && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                          className="absolute top-4 left-4 z-20 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-xl"
                        >
                          <div className="flex items-center gap-1">
                            <FaFire className="animate-pulse" />
                            -{discount}%
                          </div>
                        </motion.div>
                      )}

                      {/* Favorite Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => toggleFavorite(product._id, e)}
                        className="absolute top-4 right-4 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl border border-gray-200 hover:border-red-300 transition-all duration-300"
                      >
                        <AnimatePresence mode="wait">
                          {isFavorite ? (
                            <motion.div
                              key="filled"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                            >
                              <BsHeartFill className="text-red-500" size={18} />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="outline"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                            >
                              <FaHeart className="text-gray-400 group-hover:text-red-500 transition-colors" size={18} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>

                      {/* Product Image */}
                      <div className="relative aspect-[4/3] p-6 pb-4">
                        <div className="relative w-full h-full overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100">
                          {/* Background Glow */}
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-purple-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            className="relative w-full h-full flex items-center justify-center p-4"
                          >
                            <Image
                              src={product.image[0].src}
                              alt={product.name}
                              fill
                              className="object-contain transition-all duration-500"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          </motion.div>

                          {/* Hover Overlay */}
                          <AnimatePresence>
                            {isHovered && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center gap-3"
                              >
                                <motion.button
                                  initial={{ y: 20, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  exit={{ y: 20, opacity: 0 }}
                                  transition={{ delay: 0.1 }}
                                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl hover:bg-blue-600 hover:text-white transition-all duration-300"
                                  onClick={(e) => {e.preventDefault();router.push(`/product?id=${product._id}`)}}
                                >
                                  <FaEye  size={16} />
                                </motion.button>
                                <motion.button
                                  initial={{ y: 20, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  exit={{ y: 20, opacity: 0 }}
                                  transition={{ delay: 0.2 }}
                                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl hover:bg-green-600 hover:text-white transition-all duration-300"
                                  onClick={(e) =>{ e.preventDefault();addToCart(product._id)}}
                                >
                                  <BsCart3 size={16} />
                                </motion.button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-6 pt-2 flex-1 flex flex-col justify-between">
                        <div className="space-y-3">
                          {/* Product Name */}
                          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                            {product.name}
                          </h3>

                          {/* Category */}
                          <div className="flex items-center justify-between">
                            <span className="px-3 py-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 text-sm font-medium rounded-full">
                              {product.category}
                            </span>
                            
                            {/* Rating */}
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <BsStarFill
                                  key={i}
                                  size={12}
                                  className={i < 4 ? "text-yellow-400" : "text-gray-300"}
                                />
                              ))}
                              <span className="text-xs text-gray-500 ml-1">(4.5)</span>
                            </div>
                          </div>

                          {/* Pricing */}
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-3">
                              <motion.span
                                whileHover={{ scale: 1.05 }}
                                className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                              >
                                ₹{product.price.toLocaleString()}
                              </motion.span>
                              {product.oldPrice && (
                                <span className="text-sm text-gray-400 line-through">
                                  ₹{product.oldPrice.toLocaleString()}
                                </span>
                              )}
                            </div>

                            {/* Add to Cart Button */}
                            <motion.button
                              whileHover={{ scale: 1.1, rotate: 90 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {e.preventDefault();addToCart(product._id)}}
                              className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                            >
                              <MdAdd size={18} />
                            </motion.button>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Gradient Bar */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    </motion.div>
                  </Link>
                </motion.div>
              )
            })}
          </Carousel>
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 20px 40px -10px rgba(59, 130, 246, 0.4)" 
            }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3 mx-auto relative overflow-hidden"
          >
            <span className="relative z-10">View All {category} Products</span>
            <BsArrowRight className="group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
          </motion.button>
        </motion.div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .carousel-container .react-multi-carousel-list {
          padding: 20px 0;
        }

        .carousel-container .react-multi-carousel-item {
          height: 100%;
        }
      `}</style>
    </div>
  )
}

export default CCarousel
