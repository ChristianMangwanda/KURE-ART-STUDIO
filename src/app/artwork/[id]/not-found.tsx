import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-6xl font-light text-gray-300">404</h1>
          <h2 className="text-2xl font-light text-black">Artwork Not Found</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            The artwork you're looking for doesn't exist or may have been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/gallery"
            className="inline-flex items-center bg-black text-white px-8 py-3 hover:bg-gray-900 transition-all duration-300"
          >
            Browse Gallery
          </Link>
          
          <div>
            <Link 
              href="/"
              className="text-amber-700 hover:text-black transition-colors duration-300"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 