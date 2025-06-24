export interface Artist {
  id: string
  name: string
  bio: string
  photo: string
  location: string
  specialization: string[]
  yearsActive: number
  verified: boolean
  socialLinks?: {
    instagram?: string
    facebook?: string
    website?: string
  }
  createdAt: string
  updatedAt: string
}

export interface Artwork {
  id: string
  title: string
  artistName: string
  medium: string
  category: string
  price: number
  imageUrl: string
  images: string[]
  description: string
  dimensions: {
    width: number
    height: number
    depth?: number
    unit: 'cm' | 'in'
  }
  materials: string[]
  oneOfAKind: boolean
  available: boolean
  availability: 'available' | 'sold' | 'reserved'
  culturalSignificance?: string
  yearCreated: number
  weight?: number
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface Collection {
  id: string
  name: string
  description: string
  artworkIds: string[]
  featured: boolean
  bannerImage?: string
}

export interface User {
  id: string
  email: string
  name: string
  shippingAddress?: Address
  orderHistory: string[]
}

export interface Address {
  street: string
  city: string
  state: string
  country: string
  postalCode: string
}

export interface Order {
  id: string
  orderNumber: string
  items: CartItem[]
  customerInfo: CheckoutFormData
  total: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  createdAt: string
  updatedAt: string
  estimatedDelivery?: string
  trackingNumber?: string
}

// Cart types
export interface CartItem {
  artwork: Artwork
  quantity: number
  addedAt?: string
}

export interface Cart {
  items: CartItem[]
  total: number
  itemCount: number
}

export interface CheckoutFormData {
  email: string
  firstName: string
  lastName: string
  address: string
  city: string
  country: string
  zipCode: string
  phone: string
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T = any> {
  success: boolean
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Contact Form Types
export interface ContactFormData {
  name: string
  email: string
  message: string
  phone?: string
  subject?: string
}

// Filter and Query Types
export interface ArtworkFilters {
  category?: string
  artist?: string
  minPrice?: number
  maxPrice?: number
  medium?: string
  available?: boolean
  oneOfAKind?: boolean
  tags?: string[]
}

export interface QueryParams {
  page?: number
  limit?: number
  sort?: 'price-asc' | 'price-desc' | 'newest' | 'oldest' | 'title'
  search?: string
  filters?: ArtworkFilters
} 