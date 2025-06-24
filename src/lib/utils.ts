import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Artwork, Artist, ArtworkFilters, QueryParams } from '@/data/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// API Utility Functions
export function filterArtworks(artworks: Artwork[], filters: ArtworkFilters): Artwork[] {
  return artworks.filter(artwork => {
    // Category filter
    if (filters.category && artwork.category !== filters.category) {
      return false;
    }

    // Artist filter
    if (filters.artist && !artwork.artistName.toLowerCase().includes(filters.artist.toLowerCase())) {
      return false;
    }

    // Price range filter
    if (filters.minPrice !== undefined && artwork.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== undefined && artwork.price > filters.maxPrice) {
      return false;
    }

    // Medium filter
    if (filters.medium && artwork.medium !== filters.medium) {
      return false;
    }

    // Availability filter
    if (filters.available !== undefined && artwork.available !== filters.available) {
      return false;
    }

    // One of a kind filter
    if (filters.oneOfAKind !== undefined && artwork.oneOfAKind !== filters.oneOfAKind) {
      return false;
    }

    // Tags filter
    if (filters.tags && filters.tags.length > 0) {
      const hasTag = filters.tags.some(tag => 
        artwork.tags.some(artworkTag => 
          artworkTag.toLowerCase().includes(tag.toLowerCase())
        )
      );
      if (!hasTag) return false;
    }

    return true;
  });
}

export function sortArtworks(artworks: Artwork[], sort: string): Artwork[] {
  const sortedArtworks = [...artworks];

  switch (sort) {
    case 'price-asc':
      return sortedArtworks.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sortedArtworks.sort((a, b) => b.price - a.price);
    case 'newest':
      return sortedArtworks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case 'oldest':
      return sortedArtworks.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    case 'title':
      return sortedArtworks.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return sortedArtworks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}

export function searchArtworks(artworks: Artwork[], searchTerm: string): Artwork[] {
  if (!searchTerm) return artworks;

  const term = searchTerm.toLowerCase().trim();
  
  return artworks.filter(artwork => {
    return (
      artwork.title.toLowerCase().includes(term) ||
      artwork.artistName.toLowerCase().includes(term) ||
      artwork.description.toLowerCase().includes(term) ||
      artwork.category.toLowerCase().includes(term) ||
      artwork.medium.toLowerCase().includes(term) ||
      artwork.tags.some(tag => tag.toLowerCase().includes(term)) ||
      (artwork.culturalSignificance && artwork.culturalSignificance.toLowerCase().includes(term))
    );
  });
}

export function paginateResults<T>(items: T[], page: number = 1, limit: number = 12) {
  const offset = (page - 1) * limit;
  const paginatedItems = items.slice(offset, offset + limit);
  
  return {
    data: paginatedItems,
    pagination: {
      page,
      limit,
      total: items.length,
      totalPages: Math.ceil(items.length / limit),
      hasNext: offset + limit < items.length,
      hasPrev: page > 1
    }
  };
}

// Artist search functionality removed - now using simple artist names only

// Validation utilities
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

// Rate limiting utility (simple in-memory implementation)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  identifier: string, 
  maxRequests: number = 100, 
  windowMs: number = 15 * 60 * 1000 // 15 minutes
): boolean {
  const now = Date.now();
  const key = identifier;
  
  const record = requestCounts.get(key);
  
  if (!record || now > record.resetTime) {
    requestCounts.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (record.count >= maxRequests) {
    return false;
  }
  
  record.count++;
  return true;
}

// Format utilities
export function formatPrice(price: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
}

// SEO utilities
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function generateMetaDescription(artwork: Artwork): string {
  return `${artwork.title} by ${artwork.artistName} - ${artwork.description.substring(0, 150)}...`;
}

// Error handling utilities
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export function handleError(error: unknown): { message: string; statusCode: number } {
  if (error instanceof AppError) {
    return {
      message: error.message,
      statusCode: error.statusCode
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      statusCode: 500
    };
  }

  return {
    message: 'An unexpected error occurred',
    statusCode: 500
  };
}

// Data validation schemas
export const artworkValidationSchema = {
  title: { required: true, minLength: 1, maxLength: 200 },
      artistName: { required: true, minLength: 1 },
  price: { required: true, min: 0, max: 1000000 },
  category: { required: true, enum: ['painting', 'sculpture', 'textile', 'photography', 'mixed-media', 'pottery'] },
  medium: { required: true, minLength: 1, maxLength: 100 },
  description: { required: true, minLength: 10, maxLength: 2000 },
  images: { required: true, minLength: 1 },
  available: { required: true, type: 'boolean' },
  oneOfAKind: { required: true, type: 'boolean' }
};

export function validateArtwork(data: Record<string, unknown>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Basic validation
  if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
    errors.push('Title is required');
  }

  if (!data.artistName || typeof data.artistName !== 'string') {
          errors.push('Artist name is required');
  }

  if (typeof data.price !== 'number' || data.price < 0) {
    errors.push('Valid price is required');
  }

  if (!data.category || typeof data.category !== 'string' || !artworkValidationSchema.category.enum.includes(data.category)) {
    errors.push('Valid category is required');
  }

  if (!data.description || typeof data.description !== 'string' || data.description.length < 10) {
    errors.push('Description must be at least 10 characters');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// API Response utilities
export function createSuccessResponse<T>(data: T, message?: string) {
  return Response.json({
    success: true,
    data,
    message
  });
}

export function createErrorResponse(error: string, status: number = 400) {
  return Response.json({
    success: false,
    error
  }, { status });
}

export function createPaginatedResponse<T>(
  data: T[],
  page: number,
  limit: number,
  total: number
) {
  return {
    success: true,
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1
    }
  };
}

// AWS deployment preparation utilities
export function getEnvironmentConfig() {
  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    // AWS-specific configurations
    awsRegion: process.env.AWS_REGION || 'us-east-1',
    apiGatewayUrl: process.env.API_GATEWAY_URL,
    lambdaStage: process.env.LAMBDA_STAGE || 'dev',
    // Database configurations (for future use)
    dbUrl: process.env.DATABASE_URL,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbName: process.env.DB_NAME,
    // Email service configurations
    smtpHost: process.env.SMTP_HOST,
    smtpPort: process.env.SMTP_PORT,
    emailFrom: process.env.EMAIL_FROM || 'hello@kuraeartstudio.com',
    // File storage configurations
    s3Bucket: process.env.S3_BUCKET_NAME,
    cloudfrontDomain: process.env.CLOUDFRONT_DOMAIN
  };
}

// Request logging utility
export function logRequest(method: string, path: string, userAgent?: string) {
  const timestamp = new Date().toISOString();
  const config = getEnvironmentConfig();
  
  // In development, log to console
  if (config.isDevelopment) {
    // Development logging - remove in production
    // console.log(`[${timestamp}] ${method} ${path} - ${userAgent || 'Unknown'}`);
  }
  
  // In production, this would integrate with CloudWatch or other logging services
  if (config.isProduction) {
    // TODO: Integrate with AWS CloudWatch or other logging service
    // This is where you'd send logs to CloudWatch, Datadog, etc.
  }
} 