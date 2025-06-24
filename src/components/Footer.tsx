'use client'

import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="text-3xl font-serif font-bold text-gray-900">
                Kura
              </div>
              <div className="text-sm text-gray-600 font-light tracking-wider">
                ART STUDIO
              </div>
            </div>
            <p className="text-gray-600 text-base leading-relaxed max-w-lg mb-6">
              Connecting heritage through authentic Zimbabwean artwork. 
              Every piece tells a story of culture, tradition, and artistic excellence that spans generations.
            </p>
            <div className="text-sm text-gray-500">
              <p>Celebrating authentic Zimbabwean artistry since 2023</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-6 text-lg">Explore</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/gallery" className="text-gray-600 hover:text-amber-600 transition-colors duration-300 text-sm">
                  Art Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-amber-600 transition-colors duration-300 text-sm">
                  About Kura
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-amber-600 transition-colors duration-300 text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-600 hover:text-amber-600 transition-colors duration-300 text-sm">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-6 text-lg">Connect</h3>
            <div className="space-y-4">
              <a 
                href="https://instagram.com/kuraeartstudio" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-600 hover:text-amber-600 transition-colors duration-300"
              >
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-amber-100 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-12C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </div>
                <span className="text-sm font-medium">Follow on Instagram</span>
              </a>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Email:</span> hello@kuraeartstudio.com
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Location:</span> Harare, Zimbabwe
                </p>
              </div>
              
              <div className="pt-2">
                <p className="text-xs text-gray-500 leading-relaxed">
                  Authentic verification • Secure payments • Global shipping
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500">
              © 2024 Kura Art Studio. All rights reserved. Empowering Zimbabwean artists worldwide.
            </p>
            <div className="flex items-center space-x-4 text-xs text-gray-400">
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
              <span>•</span>
              <span>Shipping & Returns</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 