import { NextRequest } from 'next/server';
import { artworksData } from '@/data/artworks';
import { 
  filterArtworks, 
  sortArtworks, 
  searchArtworks, 
  paginateResults,
  createErrorResponse,
  createSuccessResponse,
  logRequest
} from '@/lib/utils';
import { ArtworkFilters } from '@/data/types';

// GET /api/artworks - Fetch artworks with filtering, sorting, and pagination
export async function GET(request: NextRequest) {
  try {
    const userAgent = request.headers.get('user-agent') || '';
    logRequest('GET', '/api/artworks', userAgent);

    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '12', 10);
    const sort = searchParams.get('sort') || 'newest';
    const search = searchParams.get('search') || '';
    
    // Parse filters
    const filters: ArtworkFilters = {
      category: searchParams.get('category') || undefined,
      artist: searchParams.get('artist') || undefined,
      minPrice: searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined,
      maxPrice: searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined,
      medium: searchParams.get('medium') || undefined,
      available: searchParams.get('available') === 'true' ? true : searchParams.get('available') === 'false' ? false : undefined,
      oneOfAKind: searchParams.get('oneOfAKind') === 'true' ? true : searchParams.get('oneOfAKind') === 'false' ? false : undefined,
      tags: searchParams.get('tags') ? searchParams.get('tags')!.split(',') : undefined
    };

    // Validate pagination parameters
    if (page < 1 || limit < 1 || limit > 100) {
      return createErrorResponse('Invalid pagination parameters. Page must be >= 1, limit must be between 1 and 100.', 400);
    }

    // Start with all artworks
    let filteredArtworks = [...artworksData];

    // Apply search if provided
    if (search) {
      filteredArtworks = searchArtworks(filteredArtworks, search);
    }

    // Apply filters
    filteredArtworks = filterArtworks(filteredArtworks, filters);

    // Apply sorting
    filteredArtworks = sortArtworks(filteredArtworks, sort);

    // Apply pagination
    const result = paginateResults(filteredArtworks, page, limit);

    // Add metadata
    const response = {
      success: true,
      data: result.data,
      pagination: result.pagination,
      filters: filters,
      sort: sort,
      search: search || null,
      metadata: {
        totalArtworks: artworksData.length,
        filteredCount: filteredArtworks.length,
        availableFilters: {
          categories: Array.from(new Set(artworksData.map(a => a.category))),
          artists: Array.from(new Set(artworksData.map(a => a.artistName))),
          mediums: Array.from(new Set(artworksData.map(a => a.medium))),
          priceRange: {
            min: Math.min(...artworksData.map(a => a.price)),
            max: Math.max(...artworksData.map(a => a.price))
          }
        }
      }
    };

    return Response.json(response);

  } catch (error) {
    console.error('Error in GET /api/artworks:', error);
    return createErrorResponse('Internal server error', 500);
  }
}

// POST /api/artworks - Create new artwork (for admin use)
export async function POST(request: NextRequest) {
  try {
    const userAgent = request.headers.get('user-agent') || '';
    logRequest('POST', '/api/artworks', userAgent);

    // In a real application, you'd authenticate the user here
    // For now, we'll just simulate creating an artwork

    const body = await request.json();
    
    // Basic validation
    if (!body.title || !body.artistName || !body.price) {
      return createErrorResponse('Missing required fields: title, artistName, price', 400);
    }

    // Generate new artwork ID
    const newId = (Math.max(...artworksData.map(a => parseInt(a.id))) + 1).toString();
    
    const newArtwork = {
      id: newId,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // In a real app, you'd save to database
    // For demo purposes, we'll just return the new artwork
    
    return createSuccessResponse(newArtwork, 'Artwork created successfully');

  } catch (error) {
    console.error('Error in POST /api/artworks:', error);
    return createErrorResponse('Invalid JSON or server error', 400);
  }
} 