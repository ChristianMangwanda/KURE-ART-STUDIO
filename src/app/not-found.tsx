'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-8"
        >
          <h1 className="text-8xl md:text-9xl font-light text-gray-900 leading-none">
            404
          </h1>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            Page not found
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-lg mx-auto">
            The artwork you're looking for seems to have been moved to a different gallery. 
            Let's help you find your way back to our beautiful collection.
          </p>
        </motion.div>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12"
        >
          <div className="w-32 h-32 mx-auto bg-amber-50 rounded-full flex items-center justify-center">
            <svg 
              className="w-16 h-16 text-amber-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1} 
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
              />
            </svg>
          </div>
        </motion.div>

        {/* Navigation Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/"
            className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
          >
            Return Home
          </Link>
          <Link
            href="/gallery"
            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:text-gray-900 transition-all duration-200 font-medium"
          >
            Browse Gallery
          </Link>
        </motion.div>

        {/* Additional Help */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <p className="text-sm text-gray-500 mb-4">
            Looking for something specific?
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link 
              href="/gallery?category=painting" 
              className="text-gray-600 hover:text-amber-600 transition-colors"
            >
              Paintings
            </Link>
            <Link 
              href="/gallery?category=sculpture" 
              className="text-gray-600 hover:text-amber-600 transition-colors"
            >
              Sculptures
            </Link>
            <Link 
              href="/gallery?category=textile" 
              className="text-gray-600 hover:text-amber-600 transition-colors"
            >
              Textiles
            </Link>
            <Link 
              href="/gallery?category=photography" 
              className="text-gray-600 hover:text-amber-600 transition-colors"
            >
              Photography
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-600 hover:text-amber-600 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 