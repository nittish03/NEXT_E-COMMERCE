'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useSession } from "next-auth/react"
import { products } from '@/public/assets/assets'
import Image from 'next/image'
import { useAppContext } from "@/context"
import Link from 'next/link'
import { FaPlus, FaMinus, FaTrash, FaShoppingBag, FaArrowLeft, FaHeart, FaShieldAlt, FaTruck, FaCreditCard } from 'react-icons/fa'
import { MdDelete, MdSecurity } from 'react-icons/md'
import { BsShieldCheck, BsTruck } from 'react-icons/bs'
import { motion, AnimatePresence } from 'framer-motion'

const Page = () => {
  const { data: session } = useSession();
  const [cartData, setCartData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { cartCount, setCartCount, addToCart } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [removingItems, setRemovingItems] = useState(new Set());

  const handleRemove = async (id) => {
    setRemovingItems(prev => new Set(prev).add(id));
    const loading = toast.loading("Removing item from cart...");
    try {
      await axios.post("/api/Cart/remove-product", { productId: id });
      toast.dismiss(loading);
      toast.success("Item removed successfully");
      setCartCount(cartCount - 1);
    } catch (e) {
      console.error(e);
      toast.dismiss(loading);
      toast.error("Failed to remove item");
    } finally {
      setRemovingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const handleDelete = async (id) => {
    const loading = toast.loading("Removing item from cart...");
    try {
      await axios.post("/api/Cart/delete-product", { productId: id });
      toast.dismiss(loading);
      toast.success("Item removed successfully");
    } catch (e) {
      console.error(e);
      toast.dismiss(loading);
      toast.error("Failed to remove item");
    }
  };

  const handleAddToCart = async (id) => {
    const loading = toast.loading("Adding to cart...");
    try {
      await addToCart(id);
      toast.dismiss(loading);
      toast.success("Item added to cart");
    } catch (e) {
      console.error(e);
      toast.dismiss(loading);
      toast.error("Failed to add item");
    }
  };

  useEffect(() => {
    if (cartCount > 0) {
      const getTotalProducts = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get("/api/Cart/total-products");
          const cartItems = response.data.cart.productIds.map(e => {
            return { productId: e.productId, quantity: e.quantity };
          });

          setCartData(cartItems);

          // Filter products based on cartData
          const matchingProducts = products.filter(product =>
            cartItems.some(cartItem => cartItem.productId === product._id)
          );
          setFilteredProducts(matchingProducts);

          // Calculate total price
          const total = cartItems.reduce((acc, item) => {
            const product = products.find(p => p._id === item.productId);
            if (product) {
              acc += product.price * item.quantity;
            }
            return acc;
          }, 0);
          setTotalPrice(total);
        } catch (error) {
          console.error("Error fetching cart data:", error);
        } finally {
          setIsLoading(false);
        }
      };

      if (session) {
        getTotalProducts();
      }
    } else {
      setIsLoading(false);
    }
  }, [session, cartCount]);

  // Loading Animation Component
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <FaShoppingBag className="text-blue-600 animate-pulse" size={24} />
        </div>
      </div>
    </div>
  );

  // Empty Cart Component
  const EmptyCart = () => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
    >
      <div className="relative mb-8">
        <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
          <FaShoppingBag className="text-6xl text-gray-400" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">0</span>
        </div>
      </div>
      
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
        Looks like you haven't added any items to your cart yet. Start shopping to find amazing products!
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center gap-3"
          >
            <FaArrowLeft />
            Continue Shopping
          </motion.button>
        </Link>
        <Link href="/Men">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
          >
            Explore Men's Collection
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProducts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
                <p className="text-gray-600">{filteredProducts.length} items in your cart</p>
              </div>
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition-all duration-300"
                >
                  <FaArrowLeft />
                  Continue Shopping
                </motion.button>
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <AnimatePresence>
                  {filteredProducts.map((product, index) => {
                    const cartItem = cartData.find(item => item.productId === product._id);
                    const quantity = cartItem ? cartItem.quantity : 1;
                    const isRemoving = removingItems.has(product._id);

                    return (
                      <motion.div
                        key={product._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, height: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                          isRemoving ? 'opacity-50' : ''
                        }`}
                      >
                        <div className="p-6">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                            {/* Product Image */}
                            <Link href={`/product?id=${product._id}`}>
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="relative flex-shrink-0"
                              >
                                <Image
                                  src={product.image[0].src || "/assets/product-placeholder.jpg"}
                                  alt={product.name}
                                  width={120}
                                  height={120}
                                  className="object-cover rounded-xl border border-gray-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                              </motion.div>
                            </Link>

                            {/* Product Details */}
                            <div className="flex-1 space-y-3">
                              <Link href={`/product?id=${product._id}`}>
                                <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                                  {product.name}
                                </h3>
                              </Link>
                              
                              <div className="flex items-center gap-4">
                                <span className="text-2xl font-bold text-gray-900">
                                  ₹{(product.price * quantity).toLocaleString()}
                                </span>
                                <span className="text-sm text-gray-500">
                                  ₹{product.price.toLocaleString()} each
                                </span>
                              </div>

                              {/* Quantity Controls */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center bg-gray-100 rounded-full p-1">
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleRemove(product._id)}
                                    disabled={isRemoving}
                                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-md transition-all duration-300 disabled:opacity-50"
                                  >
                                    <FaMinus size={12} />
                                  </motion.button>
                                  
                                  <span className="w-12 text-center font-semibold text-lg">
                                    {quantity}
                                  </span>
                                  
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleAddToCart(product._id)}
                                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-md transition-all duration-300"
                                  >
                                    <FaPlus size={12} />
                                  </motion.button>
                                </div>

                                <div className="flex items-center gap-2">
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-300"
                                  >
                                    <FaHeart />
                                  </motion.button>
                                  
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleDelete(product._id)}
                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-300"
                                  >
                                    <MdDelete size={20} />
                                  </motion.button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white rounded-2xl shadow-lg p-6 sticky top-24"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({filteredProducts.length} items)</span>
                      <span>₹{totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span className="text-green-600 font-semibold">Free</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax</span>
                      <span>₹{Math.round(totalPrice * 0.18).toLocaleString()}</span>
                    </div>
                    <hr className="my-4" />
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span>₹{Math.round(totalPrice * 1.18).toLocaleString()}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center gap-3 mb-4"
                  >
                    <FaCreditCard />
                    Proceed to Checkout
                  </motion.button>

                  {/* Trust Indicators */}
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-3">
                      <BsShieldCheck className="text-green-500" />
                      <span>Secure checkout with SSL encryption</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <BsTruck className="text-blue-500" />
                      <span>Free shipping on orders above ₹999</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaShieldAlt className="text-purple-500" />
                      <span>100% secure payments</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : (
          <EmptyCart />
        )}
      </div>
    </div>
  );
};

export default Page;
