'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Artist {
  id: string
  name: string
  specialization: string
  location: string
  bio: string
  verified: boolean
  featuredArtwork: {
    title: string
    medium: string
    price: number
  }
}

const featuredArtists: Artist[] = [
  {
    id: '1',
    name: 'Tendai Mukamuri',
    specialization: 'Stone Sculpture',
    location: 'Harare, Zimbabwe',
    bio: 'Master sculptor known for his dynamic Shona stone carvings that capture the essence of Zimbabwe\'s spiritual traditions.',
    verified: true,
    featuredArtwork: {
      title: 'Ancestral Wisdom',
      medium: 'Serpentine Stone',
      price: 850
    }
  },
  {
    id: '2',
    name: 'Chipo Machakaire',
    specialization: 'Contemporary Painting',
    location: 'Bulawayo, Zimbabwe',
    bio: 'Contemporary artist whose vibrant paintings explore themes of identity, diaspora, and cultural transformation.',
    verified: true,
    featuredArtwork: {
      title: 'Homecoming Dreams',
      medium: 'Acrylic on Canvas',
      price: 650
    }
  },
  {
    id: '3',
    name: 'Blessing Ngwenya',
    specialization: 'Mixed Media',
    location: 'Mutare, Zimbabwe',
    bio: 'Innovative artist combining traditional crafts with modern techniques to create stunning mixed-media installations.',
    verified: true,
    featuredArtwork: {
      title: 'Heritage Tapestry',
      medium: 'Mixed Media',
      price: 920
    }
  },
  {
    id: '4',
    name: 'Rumbidzai Mhangami',
    specialization: 'Textile Art',
    location: 'Gweru, Zimbabwe',
    bio: 'Traditional weaver and textile artist preserving ancient techniques while creating contemporary designs.',
    verified: true,
    featuredArtwork: {
      title: 'Golden Threads',
      medium: 'Hand-woven Textiles',
      price: 480
    }
  }
]

const ArtistCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextArtist = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredArtists.length)
  }

  const prevArtist = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredArtists.length) % featuredArtists.length)
  }

  return (
    <div className="relative">
      {/* Main Carousel */}
      <div className="overflow-hidden">
        <motion.div 
          className="flex"
          animate={{ x: -currentIndex * 100 + '%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {featuredArtists.map((artist, index) => (
            <div key={artist.id} className="w-full flex-shrink-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Artist Info */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-3xl font-serif font-bold text-soft-charcoal">
                      {artist.name}
                    </h3>
                    {artist.verified && (
                      <div className="bg-earth-brown text-white px-2 py-1 rounded-full text-xs font-medium">
                        ✓ Verified
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-lg text-earth-brown font-medium">
                      {artist.specialization}
                    </p>
                    <p className="text-warm-gray text-sm">
                      📍 {artist.location}
                    </p>
                  </div>

                  <p className="text-warm-gray leading-relaxed">
                    {artist.bio}
                  </p>

                  <div className="bg-warm-white p-4 rounded-lg border border-warm-gray/20">
                    <h4 className="font-serif font-semibold text-soft-charcoal mb-2">
                      Featured Artwork
                    </h4>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-soft-charcoal">
                          {artist.featuredArtwork.title}
                        </p>
                        <p className="text-sm text-warm-gray">
                          {artist.featuredArtwork.medium}
                        </p>
                      </div>
                      <p className="text-lg font-semibold text-earth-brown">
                        ${artist.featuredArtwork.price}
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Link 
                      href={`/artists/${artist.id}`}
                      className="bg-soft-charcoal text-warm-white px-6 py-3 rounded-none hover:bg-earth-brown transition-all duration-300 font-medium"
                    >
                      View Profile
                    </Link>
                    <Link 
                      href={`/gallery?artist=${artist.id}`}
                      className="border border-soft-charcoal text-soft-charcoal px-6 py-3 rounded-none hover:bg-soft-charcoal hover:text-warm-white transition-all duration-300 font-medium"
                    >
                      View Artworks
                    </Link>
                  </div>
                </div>

                {/* Artist Image/Artwork Preview */}
                <div className="relative">
                  <div className="aspect-square bg-warm-white rounded-lg overflow-hidden border border-warm-gray/20">
                    <div className="w-full h-full flex items-center justify-center text-warm-gray">
                      {/* Placeholder for artist image or featured artwork */}
                      <div className="text-center">
                        <div className="w-32 h-32 bg-earth-brown/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <svg className="w-16 h-16 text-earth-brown" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        </div>
                        <p className="text-warm-gray font-medium">{artist.name}</p>
                        <p className="text-sm text-warm-gray/70">{artist.specialization}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          onClick={prevArtist}
          className="p-2 rounded-full border border-warm-gray/30 hover:border-earth-brown hover:text-earth-brown transition-all duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Dots indicator */}
        <div className="flex space-x-2">
          {featuredArtists.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-earth-brown' : 'bg-warm-gray/30'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextArtist}
          className="p-2 rounded-full border border-warm-gray/30 hover:border-earth-brown hover:text-earth-brown transition-all duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default ArtistCarousel 