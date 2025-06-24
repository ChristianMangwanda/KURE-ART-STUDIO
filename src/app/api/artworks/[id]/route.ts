import { NextRequest } from 'next/server';
import { artworksData } from '@/data/artworks';
import { createErrorResponse, createSuccessResponse, logRequest } from '@/lib/utils';

// GET /api/artworks/[id] - Fetch specific artwork by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userAgent = request.headers.get('user-agent') || '';
    logRequest('GET', `/api/artworks/${params.id}`, userAgent);

    const artwork = artworksData.find(a => a.id === params.id);

    if (!artwork) {
      return createErrorResponse('Artwork not found', 404);
    }

    // Find related artworks (same artist or category)
    const relatedArtworks = artworksData
      .filter(a => 
        a.id !== artwork.id && 
        (a.artistName === artwork.artistName || a.category === artwork.category)
      )
      .slice(0, 4);

    const response = {
      success: true,
      data: artwork,
      relatedArtworks: relatedArtworks,
      metadata: {
        viewedAt: new Date().toISOString()
      }
    };

    return Response.json(response);

  } catch (error) {
    console.error(`Error in GET /api/artworks/${params.id}:`, error);
    return createErrorResponse('Internal server error', 500);
  }
}

// PUT /api/artworks/[id] - Update specific artwork (for admin use)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userAgent = request.headers.get('user-agent') || '';
    logRequest('PUT', `/api/artworks/${params.id}`, userAgent);

    const artwork = artworksData.find(a => a.id === params.id);

    if (!artwork) {
      return createErrorResponse('Artwork not found', 404);
    }

    const body = await request.json();

    // In a real application, you'd:
    // 1. Authenticate the user
    // 2. Validate the update data
    // 3. Update in the database
    
    const updatedArtwork = {
      ...artwork,
      ...body,
      id: params.id, // Ensure ID cannot be changed
      updatedAt: new Date().toISOString()
    };

    return createSuccessResponse(updatedArtwork, 'Artwork updated successfully');

  } catch (error) {
    console.error(`Error in PUT /api/artworks/${params.id}:`, error);
    return createErrorResponse('Invalid JSON or server error', 400);
  }
}

// DELETE /api/artworks/[id] - Delete specific artwork (for admin use)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userAgent = request.headers.get('user-agent') || '';
    logRequest('DELETE', `/api/artworks/${params.id}`, userAgent);

    const artwork = artworksData.find(a => a.id === params.id);

    if (!artwork) {
      return createErrorResponse('Artwork not found', 404);
    }

    // In a real application, you'd:
    // 1. Authenticate the user
    // 2. Check permissions
    // 3. Delete from database
    // 4. Handle any related data (orders, etc.)

    return createSuccessResponse(
      { id: params.id, deletedAt: new Date().toISOString() },
      'Artwork deleted successfully'
    );

  } catch (error) {
    console.error(`Error in DELETE /api/artworks/${params.id}:`, error);
    return createErrorResponse('Internal server error', 500);
  }
} 