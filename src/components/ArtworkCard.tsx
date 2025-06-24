'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Artwork } from '@/data/types'
import { useCart } from '@/contexts/CartContext'

interface ArtworkCardProps {
  artwork: Artwork
}

const ArtworkCard = ({ artwork }: ArtworkCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { addToCart, isInCart } = useCart()
  
  // Create placeholder images for now (5 images as requested)
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'painting':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        )
      case 'sculpture':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18s-.41-.06-.57-.18l-7.9-4.44A.991.991 0 013 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18s.41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9z"/>
          </svg>
        )
      case 'textile':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
          </svg>
        )
      case 'mixed-media':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        )
      case 'photography':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 15.5A3.5 3.5 0 008.5 12 3.5 3.5 0 0012 8.5a3.5 3.5 0 003.5 3.5A3.5 3.5 0 0012 15.5zM17.5 9a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/>
            <path d="M20 4H16.83l-1.7-1.7a2.996 2.996 0 00-2.12-.88H10.99c-.8 0-1.55.32-2.12.88L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"/>
          </svg>
        )
      default:
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
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
    <motion.div 
      className="group cursor-pointer"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden mb-6">
        {/* Placeholder Image Area */}
        <div className="w-full h-full flex items-center justify-center text-gray-400 relative">
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-200 mx-auto mb-3 flex items-center justify-center">
              {getCategoryIcon(artwork.category)}
            </div>
            <p className="text-sm font-light text-gray-500">
              {artwork.title}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Image {currentImageIndex + 1} of {placeholderImages.length}
            </p>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-black p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-black p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Image Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {placeholderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-1.5 h-1.5 transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white' 
                  : 'bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Availability Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-2 py-1 text-xs font-medium uppercase tracking-wide ${
            artwork.availability === 'available' 
              ? 'bg-green-900/20 text-green-800 backdrop-blur-sm' 
              : artwork.availability === 'sold'
              ? 'bg-red-900/20 text-red-800 backdrop-blur-sm'
              : 'bg-yellow-900/20 text-yellow-800 backdrop-blur-sm'
          }`}>
            {artwork.availability}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="space-y-3">
        {/* Artist and Category */}
        <div className="flex items-center justify-between">
                                      <span
                className="text-sm text-amber-700 transition-colors duration-300 font-medium"
              >
                {artwork.artistName}
              </span>
          
          <div className="flex items-center space-x-1 text-gray-500 text-xs uppercase tracking-wide">
            <span>{getCategoryLabel(artwork.category)}</span>
          </div>
        </div>

        {/* Artwork Title */}
        <Link href={`/artwork/${artwork.id}`}>
          <h3 className="text-lg font-light text-black hover:text-amber-700 transition-colors duration-300 leading-tight">
            {artwork.title}
          </h3>
        </Link>

        {/* Medium and Dimensions */}
        <div className="text-sm text-gray-600 space-y-1">
          <p className="font-light">{artwork.medium}</p>
          <p className="text-xs text-gray-500">
            {artwork.dimensions.width} × {artwork.dimensions.height}
            {artwork.dimensions.depth && ` × ${artwork.dimensions.depth}`} {artwork.dimensions.unit}
          </p>
        </div>

        {/* Price and Actions */}
        <div className="space-y-3 pt-2">
          <div className="text-lg font-light text-black">
            ${artwork.price.toLocaleString()}
          </div>
          
          {artwork.availability === 'available' ? (
            <div className="flex items-center space-x-3">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(artwork);
                }}
                className={`flex-1 px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                  isInCart(artwork.id)
                    ? 'bg-green-100 text-green-800 border border-green-200'
                    : 'bg-black text-white hover:bg-gray-900'
                }`}
              >
                {isInCart(artwork.id) ? 'In Cart' : 'Add to Cart'}
              </button>
              <Link 
                href={`/artwork/${artwork.id}`}
                className="group inline-flex items-center text-black hover:text-amber-700 transition-colors duration-300 text-sm font-medium"
              >
                View
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          ) : (
            <span className="text-sm text-gray-400 font-light">
              {artwork.availability === 'sold' ? 'Sold' : 'Reserved'}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ArtworkCard 