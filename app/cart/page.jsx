'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useSession } from "next-auth/react"
import { products } from '@/public/assets/assets'
import Image from 'next/image'
import { useAppContext } from "@/context";
import Link from 'next/link'

const Page = () => {
  const { data: session } = useSession();
  const [cartData, setCartData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { cartCount, setCartCount, addToCart } = useAppContext();

  useEffect(() => {
    if (cartCount > 0) {
      const getTotalProducts = async () => {
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
      };

      if (session) {
        getTotalProducts();
      }
    }
  }, [session, cartCount]);

  const handleRemove = async (id) => {
    const loading = toast.loading("Removing product");
    try {
      await axios.post("/api/Cart/remove-product", { productId: id });
      toast.dismiss(loading);
      toast.success("Product removed successfully");
      setCartCount(cartCount - 1);
    } catch (e) {
      console.error(e);
      toast.dismiss(loading);
      toast.error("Failed to remove product");
    }
  };

  const handleDelete = async (id) => {
    const loading = toast.loading("Removing product");
    try {
      await axios.post("/api/Cart/remove-product", { productId: id });
      toast.dismiss(loading);
      toast.success("Product removed successfully");
    } catch (e) {
      console.error(e);
      toast.dismiss(loading);
      toast.error("Failed to remove product");
    }
  };

  return (
    <>
      {filteredProducts.length > 0 ? (
        <div className="max-w-6xl mx-auto p-4">
          {/* Title of the Page */}
          <h1 className="text-3xl font-semibold text-center mb-8">Your Cart</h1>

          {/* Cart Items Container */}
          <div className="space-y-6">
            {/* Map through filtered products */}
            {filteredProducts.map((product) => {
              const cartItem = cartData.find(item => item.productId === product._id);
              const quantity = cartItem ? cartItem.quantity : 1;

              return (
                <div key={product._id} className="flex items-center justify-between p-4 border rounded-lg shadow-lg">
                  <div className="flex-shrink-0">
                    {/* Product Image */}
                    <Link href={`/product?id=${product._id}`}>
                      <Image
                        src={product.image[0].src || "/assets/product-placeholder.jpg"}
                        alt={product.name}
                        width={100}
                        height={100}
                        className="object-cover rounded"
                      />
                    </Link>
                  </div>
                  <div className="flex-1 ml-4">
                    <Link href={`/product?id=${product._id}`}>
                      <p className="text-lg font-semibold">{product.name}</p>
                      <p className="text-gray-500">₹{product.price * quantity}</p>
                    </Link>
                    <div className="flex items-center space-x-4 mt-2">
                      <button
                        onClick={() => { handleRemove(product._id) }}
                        className="text-lg font-semibold text-gray-700 hover:text-gray-900"
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold">{quantity}</span>
                      <button
                        onClick={() => { addToCart(product._id) }}
                        className="text-lg font-semibold text-gray-700 hover:text-gray-900"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => { handleDelete(product._id) }}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="text-center text-xl font-semibold">Your cart is empty</p>
      )}

      {/* Cart Summary */}
      <div className="mt-8 flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold">Total: ₹{totalPrice}</h2>
        <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200">
          Proceed to Checkout
        </button>
      </div>
    </>
  );
};

export default Page;
