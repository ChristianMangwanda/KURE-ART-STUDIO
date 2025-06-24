'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ArtworkCard from '@/components/ArtworkCard'
import GalleryFilters from '@/components/GalleryFilters'
import { Artwork } from '@/data/types'

interface GalleryFilters {
  category: string
  artist: string
  priceRange: [number, number]
  sortBy: string
}

const GalleryPage = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filters, setFilters] = useState<GalleryFilters>({
    category: '',
    artist: '',
    priceRange: [0, 5000],
    sortBy: 'newest'
  })

  // Use ref to track if we're already fetching to prevent multiple calls
  const isFetching = useRef(false)
  const lastFiltersRef = useRef<string>('')

  // Fetch artworks function
  const fetchArtworks = async (page: number = 1, currentFilters: GalleryFilters) => {
    // Prevent multiple simultaneous requests
    if (isFetching.current) return
    
    try {
      isFetching.current = true
      setLoading(true)
      setError(null)
      
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12',
        sort: currentFilters.sortBy,
        minPrice: currentFilters.priceRange[0].toString(),
        maxPrice: currentFilters.priceRange[1].toString(),
      })

      if (currentFilters.category) {
        params.append('category', currentFilters.category)
      }
      if (currentFilters.artist) {
        params.append('artist', currentFilters.artist)
      }

      const response = await fetch(`/api/artworks?${params}`)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch artworks: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.success) {
        setArtworks(data.data)
        setTotalPages(data.pagination.totalPages)
        setCurrentPage(data.pagination.page)
      } else {
        throw new Error(data.error || 'Failed to load artworks')
      }
    } catch (err) {
      console.error('Error fetching artworks:', err)
      setError(err instanceof Error ? err.message : 'Failed to load artworks')
    } finally {
      setLoading(false)
      isFetching.current = false
    }
  }

  // Initial load - only runs once
  useEffect(() => {
    fetchArtworks(1, filters)
  }, []) // Empty dependency array - only runs on mount

  // Handle filter changes
  const handleFilterChange = (newFilters: GalleryFilters) => {
    const filtersString = JSON.stringify(newFilters)
    
    // Only update if filters actually changed
    if (filtersString !== lastFiltersRef.current) {
      lastFiltersRef.current = filtersString
      setFilters(newFilters)
      setCurrentPage(1)
      fetchArtworks(1, newFilters)
    }
  }

  // Handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    fetchArtworks(page, filters)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Handle retry
  const handleRetry = () => {
    fetchArtworks(currentPage, filters)
  }

  // Handle clear filters
  const handleClearFilters = () => {
    const defaultFilters: GalleryFilters = {
      category: '',
      artist: '',
      priceRange: [0, 5000],
      sortBy: 'newest'
    }
    setFilters(defaultFilters)
    setCurrentPage(1)
    fetchArtworks(1, defaultFilters)
  }

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[4/5] bg-gray-200 rounded-lg mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // Error component
  const ErrorMessage = () => (
    <div className="text-center py-20">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </motion.div>
      <h3 className="text-2xl font-medium mb-3 text-gray-900">Something went wrong</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">{error}</p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={handleRetry}
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          Try Again
        </button>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:text-gray-900 transition-all duration-200"
        >
          Refresh Page
        </button>
      </div>
    </div>
  )

  // Empty state component
  const EmptyState = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-20"
    >
      <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 className="text-2xl font-medium mb-3 text-gray-900">No artworks found</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
        We couldn't find any artworks matching your current filters. Try adjusting your search criteria.
      </p>
      <button
        onClick={handleClearFilters}
        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:text-gray-900 transition-all duration-200"
      >
        Clear All Filters
      </button>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-white pt-32 pb-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex items-center space-x-2 text-sm text-gray-600 mb-12"
        >
          <span>Home</span>
          <span>—</span>
          <span className="text-black">Gallery</span>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16"
        >
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-black mb-6">
            Art <span className="italic text-amber-600">Gallery</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
            Discover our curated collection of authentic Zimbabwean artworks. 
            Each piece tells a unique story and represents the rich cultural heritage of Zimbabwe.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <GalleryFilters 
            onFiltersChange={handleFilterChange}
            loading={loading}
          />
        </motion.div>

        {/* Results Count and Status */}
        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-center mb-8"
          >
            <div className="flex items-center space-x-4">
              <p className="text-gray-700 font-medium">
                {artworks.length === 0 ? 'No artworks' : 
                 artworks.length === 1 ? '1 artwork' : 
                 `${artworks.length} artworks`}
                {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
              </p>
              {artworks.length > 0 && (
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              )}
            </div>
            {artworks.length > 0 && (
              <p className="text-sm text-gray-500">
                Last updated {new Date().toLocaleDateString()}
              </p>
            )}
          </motion.div>
        )}

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <LoadingSkeleton />
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <ErrorMessage />
            </motion.div>
          ) : artworks.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <EmptyState />
            </motion.div>
          ) : (
            <motion.div
              key="artworks"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Artwork Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
                {artworks.map((artwork, index) => (
                  <motion.div
                    key={artwork.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
                  >
                    <ArtworkCard artwork={artwork} />
                  </motion.div>
                ))}
              </div>

              {/* Enhanced Pagination */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex justify-center items-center space-x-2"
                >
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Previous
                  </button>
                  
                  {/* Page Numbers */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i
                    if (pageNum > totalPages) return null
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                          currentPage === pageNum
                            ? 'bg-black text-white'
                            : 'border border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Next
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default GalleryPage 