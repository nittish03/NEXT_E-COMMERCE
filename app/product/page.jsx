"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaHeart, 
  FaShoppingCart, 
  FaShare, 
  FaStar, 
  FaStarHalfAlt,
  FaRegStar,
  FaShieldAlt,
  FaTruck,
  FaUndo,
  FaCheck,
  FaPlus,
  FaMinus,
  FaExpand
} from "react-icons/fa";
import { BsHeartFill, BsCart3, BsShare, BsZoomIn } from "react-icons/bs";
import { MdLocalShipping, MdSecurity, MdRefresh } from "react-icons/md";
import { products } from "../../public/assets/assets";
import CCarousel from "@/components/CCarousel";
import { useAppContext } from "@/context";

// Enhanced Loading Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
    </div>
  </div>
);

// Suspense component used to manage async loading
const PageContent = () => {
  const { cartCount, setCartCount, addToCart } = useAppContext();
  
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");
  const product = products.find((product) => product._id === id);
  const filteredProducts = products.filter((e) => e.category === product?.category);

  const [selectedImage, setSelectedImage] = useState(product?.image[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  useEffect(() => {
    if (product?.image?.[0]) {
      setSelectedImage(product.image[0]);
    }
  }, [product]);

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(id);
    }
  };

  const renderStars = (rating = 4.2) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-300" />);
    }
    
    return stars;
  };

  const calculateDiscount = () => {
    if (!product?.oldPrice || !product?.price) return 0;
    return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      {/* Breadcrumb Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-sm sticky top-0 z-40 py-4 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <ul className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link href="/" className="hover:text-blue-600 transition-colors">HOME</Link></li>
            <li className="text-gray-400">/</li>
            <li><Link href={`/shop/${product.category}`} className="hover:text-blue-600 transition-colors uppercase">{product.category}</Link></li>
            <li className="text-gray-400">/</li>
            <li className="font-semibold text-gray-900 truncate max-w-xs">{product.name}</li>
          </ul>
        </div>
      </motion.nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="grid lg:grid-cols-2 gap-8 p-8">
            {/* Image Section */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Main Image */}
              <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="relative aspect-square flex items-center justify-center p-8"
                >
                  <Image
                    src={selectedImage}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="object-contain w-full h-full transition-all duration-300"
                    priority
                  />
                  
                  {/* Zoom Button */}
                  <button
                    onClick={() => setIsImageZoomed(true)}
                    className="absolute top-4 right-4 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
                  >
                    <BsZoomIn className="text-gray-700" size={18} />
                  </button>

                  {/* Discount Badge */}
                  {calculateDiscount() > 0 && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      -{calculateDiscount()}% OFF
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Thumbnail Images */}
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {product.image.map((img, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(img)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === img 
                        ? "border-blue-500 shadow-lg" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Product ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain bg-gray-50"
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Product Info Section */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Product Title */}
              <div>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight"
                >
                  {product.name}
                </motion.h1>
                
                {/* Category Badge */}
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>

              {/* Rating and Reviews */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center space-x-4"
              >
                <div className="flex items-center space-x-1">
                  {renderStars(4.2)}
                  <span className="text-gray-600 font-medium ml-2">4.2</span>
                </div>
                <div className="w-px h-6 bg-gray-300"></div>
                <span className="text-gray-600">122 reviews</span>
                <button className="text-blue-600 hover:underline text-sm">
                  Write a review
                </button>
              </motion.div>

              {/* Price Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl"
              >
                <div className="flex items-center space-x-4 mb-2">
                  <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ₹{product.price?.toLocaleString()}
                  </span>
                  {product.oldPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      ₹{product.oldPrice.toLocaleString()}
                    </span>
                  )}
                  {calculateDiscount() > 0 && (
                    <span className="bg-green-100 text-green-800 text-sm font-semibold px-2 py-1 rounded">
                      Save ₹{(product.oldPrice - product.price).toLocaleString()}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">Inclusive of all taxes</p>
              </motion.div>

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <ProductSizeSelector 
                  product={product} 
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                />
              )}

              {/* Quantity Selector */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex items-center space-x-4"
              >
                <span className="font-semibold text-gray-700">Quantity:</span>
                <div className="flex items-center bg-gray-100 rounded-xl">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 rounded-l-xl transition-colors"
                  >
                    <FaMinus size={12} />
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 rounded-r-xl transition-colors"
                  >
                    <FaPlus size={12} />
                  </button>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <BsCart3 size={20} />
                  <span>ADD TO CART</span>
                </motion.button>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="w-14 h-14 bg-white border-2 border-gray-200 rounded-2xl flex items-center justify-center hover:border-red-300 transition-all duration-300"
                  >
                    {isFavorite ? (
                      <BsHeartFill className="text-red-500" size={20} />
                    ) : (
                      <FaHeart className="text-gray-400" size={20} />
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-14 h-14 bg-white border-2 border-gray-200 rounded-2xl flex items-center justify-center hover:border-blue-300 transition-all duration-300"
                  >
                    <BsShare className="text-gray-600" size={18} />
                  </motion.button>
                </div>
              </motion.div>

              {/* Features */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <MdLocalShipping className="text-blue-600" size={20} />
                  </div>
                  <p className="text-sm text-gray-600">Free Shipping</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <MdRefresh className="text-green-600" size={20} />
                  </div>
                  <p className="text-sm text-gray-600">Easy Returns</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <MdSecurity className="text-purple-600" size={20} />
                  </div>
                  <p className="text-sm text-gray-600">Secure Payment</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Product Details Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="border-t border-gray-200 p-8"
          >
            <div className="flex space-x-8 mb-6 border-b">
              {['description', 'specifications', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 font-semibold transition-colors capitalize ${
                    activeTab === tab 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="min-h-[200px]"
              >
                {activeTab === 'description' && (
                  <div className="prose max-w-none">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {product.description || 'This is a premium quality product designed with attention to detail and crafted with the finest materials. Perfect for those who appreciate style and functionality combined in one exceptional piece.'}
                    </p>
                    <div className="mt-6 grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
                        <ul className="space-y-1 text-gray-700">
                          <li className="flex items-center"><FaCheck className="text-green-500 mr-2" size={12} /> Premium Quality Materials</li>
                          <li className="flex items-center"><FaCheck className="text-green-500 mr-2" size={12} /> Comfortable Fit</li>
                          <li className="flex items-center"><FaCheck className="text-green-500 mr-2" size={12} /> Durable Construction</li>
                          <li className="flex items-center"><FaCheck className="text-green-500 mr-2" size={12} /> Stylish Design</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Care Instructions:</h4>
                        <ul className="space-y-1 text-gray-700">
                          <li>• Machine wash cold</li>
                          <li>• Do not bleach</li>
                          <li>• Tumble dry low</li>
                          <li>• Iron on low heat</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'specifications' && (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700">Brand:</span>
                        <span className="text-gray-600">Premium Brand</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700">Category:</span>
                        <span className="text-gray-600">{product.category}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700">Material:</span>
                        <span className="text-gray-600">Premium Cotton Blend</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700">Color:</span>
                        <span className="text-gray-600">Multiple Options</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700">SKU:</span>
                        <span className="text-gray-600">{product._id}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700">Weight:</span>
                        <span className="text-gray-600">0.5 kg</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700">Dimensions:</span>
                        <span className="text-gray-600">Standard</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700">Warranty:</span>
                        <span className="text-gray-600">1 Year</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-2xl">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-bold">Customer Reviews</h4>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          Write Review
                        </button>
                      </div>
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="text-4xl font-bold">4.2</div>
                        <div>
                          <div className="flex items-center space-x-1 mb-1">
                            {renderStars(4.2)}
                          </div>
                          <p className="text-gray-600">Based on 122 reviews</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Sample Reviews */}
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="border-b border-gray-200 pb-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="font-semibold text-blue-600">U{review}</span>
                            </div>
                            <div>
                              <h5 className="font-semibold">Customer {review}</h5>
                              <div className="flex items-center space-x-1">
                                {renderStars(5)}
                              </div>
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">2 days ago</span>
                        </div>
                        <p className="text-gray-700">
                          Great product! Excellent quality and fast delivery. Highly recommended for anyone looking for premium products.
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      {/* Related Products */}
      <div className="max-w-7xl mx-auto px-6 pb-8">
        <CCarousel prod={filteredProducts} category={"Related Products"} />
      </div>

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {isImageZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setIsImageZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt={product.name}
                width={800}
                height={800}
                className="w-full h-full object-contain"
              />
            </motion.div>
            <button
              onClick={() => setIsImageZoomed(false)}
              className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Page = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <PageContent />
  </Suspense>
);

export default Page;

// Enhanced ProductSizeSelector Component
const ProductSizeSelector = ({ product, selectedSize, setSelectedSize }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="space-y-3"
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold text-gray-700">Select Size</span>
        <button className="text-blue-600 text-sm hover:underline">
          Size Guide
        </button>
      </div>
      <div className="flex flex-wrap gap-3">
        {product?.sizes?.map((size) => (
          <motion.button
            key={size}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedSize(size)}
            className={`min-w-12 h-12 px-4 rounded-xl font-semibold transition-all duration-300 border-2 ${
              selectedSize === size
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            {size}
          </motion.button>
        ))}
      </div>
      {selectedSize && (
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-green-600 flex items-center"
        >
          <FaCheck size={12} className="mr-2" />
          Size {selectedSize} selected
        </motion.p>
      )}
    </motion.div>
  );
};
