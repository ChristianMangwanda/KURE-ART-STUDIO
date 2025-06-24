'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface GalleryFiltersProps {
  onFiltersChange: (filters: {
    category: string
    artist: string
    priceRange: [number, number]
    sortBy: string
  }) => void
  loading?: boolean
}

const GalleryFilters = ({ onFiltersChange, loading = false }: GalleryFiltersProps) => {
  const [activeCategory, setActiveCategory] = useState('')
  const [activeArtist, setActiveArtist] = useState('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])
  const [sortBy, setSortBy] = useState('newest')

  const categories = [
    { id: '', label: 'All Categories' },
    { id: 'painting', label: 'Paintings' },
    { id: 'sculpture', label: 'Sculptures' },
    { id: 'textile', label: 'Textiles' },
    { id: 'photography', label: 'Photography' },
    { id: 'mixed-media', label: 'Mixed Media' },
    { id: 'pottery', label: 'Pottery' }
  ]

  const artists = [
    { id: '', label: 'All Artists' },
    { id: 'tendai-mukamuri', label: 'Tendai Mukamuri' },
    { id: 'chipo-chikonzo', label: 'Chipo Chikonzo' },
    { id: 'farai-msipa', label: 'Farai Msipa' },
    { id: 'rutendo-mapfumo', label: 'Rutendo Mapfumo' },
    { id: 'blessing-tangayi', label: 'Blessing Tangayi' },
    { id: 'nyasha-mudzamiri', label: 'Nyasha Mudzamiri' }
  ]

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'title', label: 'Alphabetical' }
  ]

  useEffect(() => {
    onFiltersChange({
      category: activeCategory,
      artist: activeArtist,
      priceRange,
      sortBy
    })
  }, [activeCategory, activeArtist, priceRange, sortBy, onFiltersChange])

  const clearAllFilters = () => {
    setActiveCategory('')
    setActiveArtist('')
    setPriceRange([0, 5000])
    setSortBy('newest')
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-gray-50 rounded-lg"
    >
      {/* Category Filter */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value)}
          disabled={loading}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      {/* Artist Filter */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">Artist</label>
        <select
          value={activeArtist}
          onChange={(e) => setActiveArtist(e.target.value)}
          disabled={loading}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {artists.map((artist) => (
            <option key={artist.id} value={artist.id}>
              {artist.label}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            disabled={loading}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>$0</span>
            <span>$5,000</span>
          </div>
        </div>
      </div>

      {/* Sort Options */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          disabled={loading}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Clear Filters Button */}
      <div className="md:col-span-2 lg:col-span-4 flex justify-end">
        <button
          onClick={clearAllFilters}
          disabled={loading}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center space-x-2">
              <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Loading...</span>
            </span>
          ) : (
            'Clear Filters'
          )}
        </button>
      </div>
    </motion.div>
  )
}

export default GalleryFilters 