'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const CheckoutSuccessPage = () => {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const orderIdParam = searchParams.get('orderId');
    setOrderId(orderIdParam);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-white pt-32 pb-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto">
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
          <span className="text-black">Order Confirmed</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 150 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-12"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-black mb-6">
              Order <span className="italic text-amber-600">Confirmed!</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Thank you for your purchase. Your order has been successfully processed.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-gray-50 rounded-lg p-8 mb-12"
          >
            <h2 className="text-2xl font-light mb-6">Order Details</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Order Number</span>
                <span className="font-medium font-mono">{orderId || 'KAS-######'}</span>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Order Date</span>
                <span className="font-medium">{new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Payment Status</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Paid
                </span>
              </div>
              
              <div className="flex items-center justify-between py-3">
                <span className="text-gray-600">Estimated Delivery</span>
                <span className="font-medium">5-7 business days</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-left max-w-2xl mx-auto mb-12"
          >
            <h2 className="text-2xl font-light mb-6 text-center">What's Next?</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium">
                  1
                </div>
                <div>
                  <h3 className="font-medium mb-1">Order Confirmation Email</h3>
                  <p className="text-gray-600 text-sm">
                    You'll receive a detailed order confirmation email within the next few minutes.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium">
                  2
                </div>
                <div>
                  <h3 className="font-medium mb-1">Artist Notification</h3>
                  <p className="text-gray-600 text-sm">
                    The artist has been notified and will begin preparing your artwork for shipment.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium">
                  3
                </div>
                <div>
                  <h3 className="font-medium mb-1">Shipping Updates</h3>
                  <p className="text-gray-600 text-sm">
                    You'll receive tracking information once your artwork ships.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium">
                  4
                </div>
                <div>
                  <h3 className="font-medium mb-1">Enjoy Your Art</h3>
                  <p className="text-gray-600 text-sm">
                    Your authentic Zimbabwean artwork will arrive ready to display and enjoy.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Link
              href="/gallery"
              className="inline-flex items-center px-8 py-4 bg-black text-white font-medium rounded-lg hover:bg-gray-900 transition-colors"
            >
              Continue Shopping
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 border border-gray-300 text-black font-medium rounded-lg hover:border-gray-400 transition-colors"
            >
              Contact Support
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-16 pt-8 border-t border-gray-200"
          >
            <p className="text-gray-600 mb-4">
              Need help with your order?
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                              <a href="mailto:support@kuraeartstudio.com" className="hover:text-black transition-colors">
                  support@kuraeartstudio.com
              </a>
              <span>•</span>
              <span>Response within 24 hours</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage; 