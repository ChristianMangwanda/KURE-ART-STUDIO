'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [loading, setLoading] = useState(false);
  const [removingItems, setRemovingItems] = useState<Set<string>>(new Set());

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleRemoveItem = async (artworkId: string) => {
    setRemovingItems(prev => new Set(prev).add(artworkId));
    // Add slight delay for better UX
    setTimeout(() => {
      removeFromCart(artworkId);
      setRemovingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(artworkId);
        return newSet;
      });
    }, 300);
  };

  const handleQuantityChange = (artworkId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(artworkId, newQuantity);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-white pt-32 pb-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-12"
          >
            <Link href="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <span>—</span>
            <span className="text-black">Cart</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-light mb-6">Your Cart is Empty</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover beautiful Zimbabwean artworks and start building your collection.
            </p>
            <Link 
              href="/gallery"
              className="inline-flex items-center px-8 py-4 bg-black text-white font-medium rounded-lg hover:bg-gray-900 transition-colors"
            >
              Browse Gallery
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex items-center space-x-2 text-sm text-gray-600 mb-12"
        >
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span>—</span>
          <span className="text-black">Cart</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12"
        >
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-black mb-4">
            Your <span className="italic text-amber-600">Cart</span>
          </h1>
          <p className="text-xl text-gray-600">
            {cart.itemCount} {cart.itemCount === 1 ? 'item' : 'items'} in your collection
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {cart.items.map((item, index) => (
                <motion.div
                  key={item.artwork.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: removingItems.has(item.artwork.id) ? 0.5 : 1, 
                    y: 0,
                    scale: removingItems.has(item.artwork.id) ? 0.95 : 1
                  }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start space-x-6 p-6 border border-gray-100 rounded-lg hover:border-gray-200 transition-all duration-300 hover:shadow-sm"
                >
                  <div className="relative w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.artwork.images[0]}
                      alt={item.artwork.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      sizes="(max-width: 128px) 100vw, 128px"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-medium text-black mb-2 hover:text-amber-700 transition-colors">
                      <Link href={`/artwork/${item.artwork.id}`}>
                        {item.artwork.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-2">by {item.artwork.artistName}</p>
                    <p className="text-sm text-gray-500 mb-4 capitalize">{item.artwork.category}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleQuantityChange(item.artwork.id, item.quantity - 1)}
                          disabled={item.quantity <= 1 || removingItems.has(item.artwork.id)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.artwork.id, item.quantity + 1)}
                          disabled={removingItems.has(item.artwork.id)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-medium text-black">
                          {formatPrice(item.artwork.price * item.quantity)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-gray-500">
                            {formatPrice(item.artwork.price)} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemoveItem(item.artwork.id)}
                    disabled={removingItems.has(item.artwork.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                    title="Remove from cart"
                  >
                    {removingItems.has(item.artwork.id) ? (
                      <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-8 sticky top-32">
              <h2 className="text-2xl font-light mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(cart.total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Estimated Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-medium">
                    <span>Total</span>
                    <span>{formatPrice(cart.total)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Link
                  href="/checkout"
                  className="w-full bg-black text-white py-4 px-6 rounded-lg font-medium hover:bg-gray-900 transition-colors flex items-center justify-center group"
                >
                  Proceed to Checkout
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>

                <Link
                  href="/gallery"
                  className="w-full border border-gray-300 text-black py-4 px-6 rounded-lg font-medium hover:border-gray-400 transition-colors flex items-center justify-center"
                >
                  Continue Shopping
                </Link>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Secure checkout powered by Stripe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;