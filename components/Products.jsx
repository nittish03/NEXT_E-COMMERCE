"use client"
import React, { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FaHeart, FaShoppingCart, FaEye, FaStar, FaFire, FaTags } from 'react-icons/fa'
import { BsArrowRight, BsStarFill, BsHeartFill, BsCart3 } from 'react-icons/bs'
import { MdAdd, MdFavorite, MdVisibility } from 'react-icons/md'
import { useAppContext } from "@/context";
import { useRouter } from 'next/navigation';

const Products = ({ prod }) => {
  const router = useRouter();
  const { cartCount, setCartCount, addToCart } = useAppContext();
  const [favorites, setFavorites] = useState(new Set())
  const [hoveredProduct, setHoveredProduct] = useState(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

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

  const handleQuickView = (productId, e) => {
    e.preventDefault()
    e.stopPropagation()
    // Add quick view functionality here
    console.log('Quick view product:', productId)
  }

  const handleQuickAddToCart = (productId, e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(productId)
  }

  const handleViewAll = () => {
    router.push('/products')
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9
    },
    show: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  }

  const renderStars = (rating = 4.5) => {
    return [...Array(5)].map((_, i) => (
      <BsStarFill
        key={i}
        size={10}
        className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-16 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-pink-400/10 to-red-400/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/10 to-pink-500/10 backdrop-blur-sm px-6 py-3 rounded-full border border-red-200 mb-6"
          >
            <FaFire className="text-red-500 animate-pulse" />
            <span className="text-sm font-semibold text-red-600 uppercase tracking-wide">
              Trending Now
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
              New Collections
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Discover our latest arrivals featuring the most stylish and trendy pieces
          </motion.p>

          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-red-500 to-pink-500 mx-auto rounded-full mb-8"
          />
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
        >
          {prod?.map((product, index) => {
            const discount = product.oldPrice ? calculateDiscount(product.oldPrice, product.price) : 0
            const isFavorite = favorites.has(product._id)
            const isHovered = hoveredProduct === product._id

            return (
              <motion.div
                key={product._id}
                variants={item}
                className="group relative"
                onMouseEnter={() => setHoveredProduct(product._id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <Link href={`/product?id=${product._id}`}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 group-hover:border-blue-200"
                  >
                    {/* Discount Badge */}
                    {discount > 0 && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                        className="absolute top-3 left-3 z-20 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                      >
                        -{discount}%
                      </motion.div>
                    )}

                    {/* Favorite Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => toggleFavorite(product._id, e)}
                      className="absolute top-3 right-3 z-20 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-gray-200 hover:bg-white transition-all duration-300"
                    >
                      <AnimatePresence mode="wait">
                        {isFavorite ? (
                          <motion.div
                            key="filled"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            <BsHeartFill className="text-red-500" size={16} />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="outline"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            <FaHeart className="text-gray-400 group-hover:text-red-500 transition-colors" size={16} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>

                    {/* Product Image Container */}
                    <div className="relative p-4 pb-2">
                      <div className="relative aspect-square mb-4 overflow-hidden rounded-xl bg-gray-50">
                        {/* Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 opacity-50" />
                        
                        {/* Product Image */}
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                          className="relative w-full h-full flex items-center justify-center"
                        >
                          <Image
                            src={product.image?.[0]?.src || '/placeholder-image.jpg'}
                            alt={product.name || 'Product'}
                            width={300}
                            height={300}
                            className="object-contain max-w-full max-h-full transition-all duration-500"
                            priority={index < 8}
                          />
                        </motion.div>

                        {/* Hover Overlay with Quick Actions */}
                        <AnimatePresence>
                          {isHovered && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center gap-2"
                            >
                              <motion.button
                                initial={{ scale: 0, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0, y: 20 }}
                                transition={{ delay: 0.1 }}
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
                                onClick={(e) => handleQuickView(product._id, e)}
                                title="Quick View"
                              >
                                <MdVisibility size={16} />
                              </motion.button>
                              <motion.button
                                initial={{ scale: 0, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0, y: 20 }}
                                transition={{ delay: 0.2 }}
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 hover:text-white transition-all duration-300"
                                onClick={(e) => handleQuickAddToCart(product._id, e)}
                                title="Add to Cart"
                              >
                                <BsCart3 size={16} />
                              </motion.button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Product Info */}
                      <div className="space-y-2">
                        {/* Product Name */}
                        <h3 className="text-sm md:text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                          {product.name || 'Product Name'}
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center gap-1">
                          {renderStars(product.rating)}
                          <span className="text-xs text-gray-500 ml-1">
                            ({product.rating || 4.5})
                          </span>
                        </div>

                        {/* Pricing */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <motion.span
                              whileHover={{ scale: 1.05 }}
                              className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                            >
                              ₹{product.price?.toLocaleString() || '0'}
                            </motion.span>
                            {product.oldPrice && (
                              <span className="text-xs md:text-sm text-gray-400 line-through">
                                ₹{product.oldPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                          
                          {/* Quick Add Button */}
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => handleQuickAddToCart(product._id, e)}
                            className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                            title="Add to Cart"
                          >
                            <MdAdd size={16} />
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Gradient Line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 20px 40px -10px rgba(59, 130, 246, 0.3)" 
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleViewAll}
            className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto relative overflow-hidden"
          >
            <span className="relative z-10">View All Products</span>
            <BsArrowRight className="group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
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
      `}</style>
    </div>
  )
}

export default Products
