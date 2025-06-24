'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { artworksData } from '@/data/artworks'
import { Artwork } from '@/data/types'

interface ArtworkPageProps {
  params: {
    id: string
  }
}

export default function ArtworkPage({ params }: ArtworkPageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  // Find the artwork
  const artwork = useMemo(() => 
    artworksData.find(work => work.id === params.id), 
    [params.id]
  )

  // If artwork not found, show 404
  if (!artwork) {
    notFound()
  }

  // Create placeholder images (5 images per artwork)
  const placeholderImages = Array(5).fill(null).map((_, index) => ({
    id: index,
    alt: `${artwork.title} - View ${index + 1}`,
    placeholder: true
  }))

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % placeholderImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + placeholderImages.length) % placeholderImages.length)
  }

  const handleAddToCart = async () => {
    if (!artwork.available) return
    
    setIsAddingToCart(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsAddingToCart(false)
    
    // Here you would typically dispatch to a cart context or call an API
    // console.log(`Added ${quantity} of ${artwork.title} to cart`) // Removed for production
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'painting':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        )
      case 'sculpture':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18s-.41-.06-.57-.18l-7.9-4.44A.991.991 0 013 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18s.41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9z"/>
          </svg>
        )
      case 'textile':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
          </svg>
        )
      case 'mixed-media':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        )
      case 'photography':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 15.5A3.5 3.5 0 008.5 12 3.5 3.5 0 0012 8.5a3.5 3.5 0 003.5 3.5A3.5 3.5 0 0012 15.5zM17.5 9a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/>
            <path d="M20 4H16.83l-1.7-1.7a2.996 2.996 0 00-2.12-.88H10.99c-.8 0-1.55.32-2.12.88L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"/>
          </svg>
        )
      default:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        )
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'mixed-media': return 'Mixed Media'
      case 'photography': return 'Photography'
      default: return category.charAt(0).toUpperCase() + category.slice(1)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <section className="py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.nav 
            className="flex items-center space-x-4 text-sm text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="hover:text-black transition-colors duration-300">
              Home
            </Link>
            <span>/</span>
            <Link href="/gallery" className="hover:text-black transition-colors duration-300">
              Gallery
            </Link>
            <span>/</span>
            <span className="text-black font-medium">{artwork.title}</span>
          </motion.nav>
        </div>
      </section>

      {/* Main Product Section */}
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Image Gallery */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Main Image */}
              <div className="relative aspect-square bg-gray-100 overflow-hidden group">
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gray-200 mx-auto mb-4 flex items-center justify-center">
                      {getCategoryIcon(artwork.category)}
                    </div>
                    <h3 className="text-xl font-light text-gray-600 mb-2">{artwork.title}</h3>
                    <p className="text-sm text-gray-500">
                      High Resolution Image {currentImageIndex + 1} of {placeholderImages.length}
                    </p>
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-black p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-black p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Availability Badge */}
                <div className="absolute top-6 right-6">
                  <span className={`px-3 py-1 text-sm font-medium uppercase tracking-wide backdrop-blur-sm ${
                    artwork.availability === 'available' 
                      ? 'bg-green-900/20 text-green-800' 
                      : artwork.availability === 'sold'
                      ? 'bg-red-900/20 text-red-800'
                      : 'bg-yellow-900/20 text-yellow-800'
                  }`}>
                    {artwork.availability}
                  </span>
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-5 gap-3">
                {placeholderImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square bg-gray-100 hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center ${
                      index === currentImageIndex ? 'ring-2 ring-black' : ''
                    }`}
                  >
                    <span className="text-xs text-gray-500">{index + 1}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Details */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Category and Artist */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  {getCategoryIcon(artwork.category)}
                  <span className="uppercase tracking-wide">{getCategoryLabel(artwork.category)}</span>
                </div>
                <span className="text-amber-700 font-medium">
                  by {artwork.artistName}
                </span>
              </div>

              {/* Title */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-light text-black leading-tight">
                  {artwork.title}
                </h1>
                
                {/* Price */}
                <div className="text-3xl font-light text-black">
                  ${artwork.price.toLocaleString()}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-black">Description</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {artwork.description}
                </p>
              </div>

              {/* Artwork Details */}
              <div className="space-y-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-black mb-2">Medium</h4>
                    <p className="text-gray-600">{artwork.medium}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-black mb-2">Dimensions</h4>
                    <p className="text-gray-600">
                      {artwork.dimensions.width} × {artwork.dimensions.height}
                      {artwork.dimensions.depth && ` × ${artwork.dimensions.depth}`} {artwork.dimensions.unit}
                    </p>
                  </div>
                </div>

                {artwork.materials && artwork.materials.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-black mb-2">Materials</h4>
                    <p className="text-gray-600">{artwork.materials.join(', ')}</p>
                  </div>
                )}

                {artwork.culturalSignificance && (
                  <div>
                    <h4 className="text-sm font-medium text-black mb-2">Cultural Significance</h4>
                    <p className="text-gray-600">{artwork.culturalSignificance}</p>
                  </div>
                )}
              </div>

              {/* Add to Cart Section */}
              {artwork.availability === 'available' && (
                <div className="space-y-6 pt-6 border-t border-gray-200">
                  {/* Quantity Selector */}
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-black">Quantity:</span>
                    <div className="flex items-center border border-gray-300">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-2 hover:bg-gray-100 transition-colors duration-300"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 text-center min-w-[60px]">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-2 hover:bg-gray-100 transition-colors duration-300"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    className="w-full bg-black text-white py-4 hover:bg-gray-900 transition-all duration-300 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isAddingToCart ? (
                      <>
                        <div className="w-5 h-5 border border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Adding to Cart...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h7M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
                        </svg>
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>

                  {/* Additional Options */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 border border-gray-300 text-black py-3 hover:border-black transition-all duration-300 text-sm font-medium">
                      Add to Wishlist
                    </button>
                    <button className="flex-1 border border-gray-300 text-black py-3 hover:border-black transition-all duration-300 text-sm font-medium">
                      Ask a Question
                    </button>
                  </div>
                </div>
              )}

              {/* Unavailable Message */}
              {artwork.availability !== 'available' && (
                <div className="pt-6 border-t border-gray-200">
                  <div className="bg-gray-100 p-6 text-center">
                    <h4 className="text-lg font-medium text-black mb-2">
                      {artwork.availability === 'sold' ? 'Artwork Sold' : 'Currently Reserved'}
                    </h4>
                    <p className="text-gray-600 mb-4">
                      {artwork.availability === 'sold' 
                        ? 'This beautiful piece has found its new home.' 
                        : 'This artwork is currently reserved for another collector.'
                      }
                    </p>
                    <Link 
                      href="/gallery"
                      className="inline-flex items-center text-amber-700 hover:text-black transition-colors duration-300 font-medium"
                    >
                      Browse Similar Artworks
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Simple Artist Info Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 mb-6">
              <div className="w-8 h-[1px] bg-gray-400"></div>
              <span className="uppercase tracking-wider">Artist</span>
              <div className="w-8 h-[1px] bg-gray-400"></div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-light text-black mb-4">
              {artwork.artistName}
            </h2>
            
            <p className="text-lg text-gray-600">
              Discover more beautiful artworks from this talented artist in our gallery.
            </p>

            <div className="flex justify-center mt-8">
              <Link 
                href="/gallery"
                className="group inline-flex items-center text-amber-700 hover:text-black transition-colors duration-300 text-lg font-medium"
              >
                View Gallery
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 