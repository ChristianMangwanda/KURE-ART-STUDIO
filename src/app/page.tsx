'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
// Artist carousel removed

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Inspired by Faza's clean approach */}
      <section className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="space-y-8"
            >
              {/* Main Headline */}
              <div className="space-y-4">
                <motion.h1 
                  className="text-5xl md:text-7xl lg:text-8xl font-light leading-[0.9] text-black tracking-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.4, delay: 0.2 }}
                >
                  Authentic
                  <br />
                  <span className="font-serif italic text-amber-700">Zimbabwean</span>
                  <br />
                  Artistry
                </motion.h1>
                
                <motion.div 
                  className="flex items-center space-x-4 text-lg text-gray-600"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  <div className="w-12 h-[1px] bg-gray-400"></div>
                  <span>Curated for the Global Diaspora</span>
                </motion.div>
              </div>

              {/* Description */}
              <motion.p 
                className="text-xl md:text-2xl text-gray-700 max-w-2xl leading-relaxed font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                Discover one-of-a-kind artwork that tells the stories of Zimbabwe's 
                rich cultural heritage, crafted by verified artists.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 pt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
              >
                <Link 
                  href="/gallery" 
                  className="group inline-flex items-center bg-black text-white px-8 py-4 hover:bg-gray-900 transition-all duration-500 text-lg font-medium"
                >
                  Explore Gallery
                  <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                
                <Link 
                  href="/about" 
                  className="inline-flex items-center border border-gray-300 text-black px-8 py-4 hover:border-black transition-all duration-300 text-lg font-medium"
                >
                  Our Story
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Side - Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative h-[600px] lg:h-[700px]"
            >
              <div className="relative w-full h-full overflow-hidden rounded-lg shadow-2xl">
                <Image
                  src="/85753472677.jpg"
                  alt="Zimbabwean Artwork"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <div className="flex items-center space-x-3 text-sm text-gray-500">
            <div className="w-6 h-[1px] bg-gray-400"></div>
            <span>Scroll to explore</span>
          </div>
        </motion.div>
      </section>

      {/* Featured Stats Section */}
      <section className="py-20 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-light text-black">50+</div>
              <div className="text-gray-600 text-sm uppercase tracking-wider">Verified Artists</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-light text-black">200+</div>
              <div className="text-gray-600 text-sm uppercase tracking-wider">Artworks</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-light text-black">15+</div>
              <div className="text-gray-600 text-sm uppercase tracking-wider">Countries</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-light text-black">98%</div>
              <div className="text-gray-600 text-sm uppercase tracking-wider">Satisfaction</div>
            </div>
          </motion.div>
        </div>
      </section>

              {/* About Kura Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-8">
              <div className="space-y-4">
                <motion.div 
                  className="flex items-center space-x-4 text-sm text-gray-600"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="w-8 h-[1px] bg-gray-400"></div>
                  <span className="uppercase tracking-wider">About Kura</span>
                </motion.div>
                
                <h2 className="text-4xl md:text-5xl font-light text-black leading-tight">
                  What is <em className="font-serif italic text-amber-700">Kura</em>?
                </h2>
              </div>
              
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  "Kura" means "growth" in Shona, representing our mission to nurture 
                  artistic talent while preserving Zimbabwe's cultural heritage.
                </p>
                <p>
                  Each piece in our collection is more than art—it's a bridge connecting 
                  diaspora communities to their roots. We work directly with verified 
                  artists to ensure authenticity and fair compensation.
                </p>
              </div>
              
              <Link 
                href="/about" 
                className="group inline-flex items-center text-black hover:text-amber-700 transition-colors duration-300 text-lg"
              >
                Learn More About Our Mission
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            
            <div className="relative">
              <motion.div 
                className="aspect-[4/5] bg-gray-200 overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <div className="text-center space-y-4">
                    <svg className="w-16 h-16 mx-auto text-amber-700/50" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <p className="text-lg font-medium">Featured Artwork</p>
                    <p className="text-sm text-gray-400">Coming Soon</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Artist section removed */}
    </div>
  )
} 