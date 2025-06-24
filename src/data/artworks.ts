import { Artwork } from './types';

export const artworksData: Artwork[] = [
  {
    id: '1',
    title: 'Ancestral Whispers',
    artistName: 'Tendai Mukamuri',
    medium: 'Serpentine Stone',
    category: 'sculpture',
    price: 2500,
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1549891472-713d9b516c2e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502780402662-acc01917286e?w=800&h=600&fit=crop'
    ],
    description: 'A powerful serpentine stone sculpture representing the connection between the living and ancestral spirits. The flowing lines and polished finish reflect traditional Shona carving techniques passed down through generations.',
    dimensions: {
      width: 45,
      height: 60,
      depth: 30,
      unit: 'cm'
    },
    materials: ['Serpentine Stone', 'Natural Polish'],
    oneOfAKind: true,
    available: true,
    availability: 'available',
    culturalSignificance: 'Represents the spiritual connection between ancestors and descendants in Shona culture',
    yearCreated: 2023,
    weight: 25,
    tags: ['sculpture', 'traditional', 'spiritual', 'shona', 'serpentine'],
    createdAt: '2023-06-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Sunset Over Victoria Falls',
    artistName: 'Chipo Chikonzo',
    medium: 'Acrylic on Canvas',
    category: 'painting',
    price: 1800,
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1549891472-713d9b516c2e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502780402662-acc01917286e?w=800&h=600&fit=crop'
    ],
    description: 'A breathtaking acrylic painting capturing the majestic beauty of Victoria Falls at sunset. The warm oranges and deep blues create a dramatic contrast that embodies the power and serenity of Zimbabwe\'s natural wonder.',
    dimensions: {
      width: 80,
      height: 60,
      unit: 'cm'
    },
    materials: ['Acrylic Paint', 'Canvas', 'Wooden Frame'],
    oneOfAKind: true,
    available: true,
    availability: 'available',
    culturalSignificance: 'Victoria Falls holds deep spiritual significance as "Mosi-oa-Tunya" - the smoke that thunders',
    yearCreated: 2024,
    weight: 3,
    tags: ['painting', 'landscape', 'victoria-falls', 'acrylic', 'sunset'],
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-02-10T09:15:00Z'
  },
  {
    id: '3',
    title: 'Woven Memories',
    artistName: 'Farai Msipa',
    medium: 'Traditional Weaving',
    category: 'textile',
    price: 950,
    imageUrl: 'https://images.unsplash.com/photo-1549891472-713d9b516c2e?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1549891472-713d9b516c2e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502780402662-acc01917286e?w=800&h=600&fit=crop'
    ],
    description: 'An intricate textile piece that weaves together traditional patterns with contemporary storytelling. Created using sustainable materials and time-honored techniques, this piece represents the continuity of cultural knowledge.',
    dimensions: {
      width: 100,
      height: 150,
      unit: 'cm'
    },
    materials: ['Organic Cotton', 'Natural Dyes', 'Recycled Fibers'],
    oneOfAKind: true,
    available: true,
    availability: 'available',
    culturalSignificance: 'Traditional weaving patterns tell stories of community history and cultural identity',
    yearCreated: 2023,
    weight: 2,
    tags: ['textile', 'weaving', 'sustainable', 'traditional', 'storytelling'],
    createdAt: '2023-08-10T11:45:00Z',
    updatedAt: '2024-01-22T16:20:00Z'
  },
  {
    id: '4',
    title: 'Urban Rhythms Series #3',
    artistName: 'Rutendo Mapfumo',
    medium: 'Digital Photography',
    category: 'photography',
    price: 650,
    imageUrl: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1549891472-713d9b516c2e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502780402662-acc01917286e?w=800&h=600&fit=crop'
    ],
    description: 'Part of a powerful series documenting the vibrant street life of Harare. This photograph captures the intersection of tradition and modernity in urban Zimbabwe, showcasing the resilience and creativity of city life.',
    dimensions: {
      width: 70,
      height: 50,
      unit: 'cm'
    },
    materials: ['Digital Print', 'Archival Paper', 'Professional Frame'],
    oneOfAKind: false,
    available: true,
    availability: 'available',
    culturalSignificance: 'Documents the evolution of Zimbabwean urban culture and daily life',
    yearCreated: 2024,
    weight: 1,
    tags: ['photography', 'urban', 'documentary', 'street-life', 'harare'],
    createdAt: '2024-02-15T08:00:00Z',
    updatedAt: '2024-03-01T12:30:00Z'
  },
  {
    id: '5',
    title: 'Harvest Vessel',
    artistName: 'Blessing Tangayi',
    medium: 'Ceramic',
    category: 'pottery',
    price: 420,
    imageUrl: 'https://images.unsplash.com/photo-1502780402662-acc01917286e?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1502780402662-acc01917286e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1549891472-713d9b516c2e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&h=600&fit=crop'
    ],
    description: 'A beautifully crafted ceramic vessel inspired by traditional Zimbabwean pottery forms. The earthy glazes and functional design make this piece both a work of art and a practical household item.',
    dimensions: {
      width: 25,
      height: 35,
      depth: 25,
      unit: 'cm'
    },
    materials: ['Local Clay', 'Natural Glazes', 'Wood Fired'],
    oneOfAKind: true,
    available: true,
    availability: 'available',
    culturalSignificance: 'Traditional pottery forms used for storing grain and water in Zimbabwean households',
    yearCreated: 2023,
    weight: 4,
    tags: ['pottery', 'ceramic', 'functional', 'traditional', 'vessel'],
    createdAt: '2023-09-22T13:15:00Z',
    updatedAt: '2024-02-28T15:45:00Z'
  },
  {
    id: '6',
    title: 'Fragments of Identity',
    artistName: 'Nyasha Mudzamiri',
    medium: 'Mixed Media',
    category: 'mixed-media',
    price: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1549891472-713d9b516c2e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502780402662-acc01917286e?w=800&h=600&fit=crop'
    ],
    description: 'A compelling mixed-media work that explores themes of cultural identity and belonging. Incorporating found objects, newspaper clippings, and traditional materials, this piece reflects on the complex nature of modern African identity.',
    dimensions: {
      width: 90,
      height: 120,
      depth: 8,
      unit: 'cm'
    },
    materials: ['Canvas', 'Newspaper', 'Fabric', 'Found Objects', 'Acrylic Paint'],
    oneOfAKind: true,
    available: true,
    availability: 'available',
    culturalSignificance: 'Explores the intersection of traditional and contemporary African identity',
    yearCreated: 2024,
    weight: 5,
    tags: ['mixed-media', 'identity', 'contemporary', 'cultural', 'collage'],
    createdAt: '2024-01-05T16:00:00Z',
    updatedAt: '2024-01-10T11:00:00Z'
  },
  {
    id: '7',
    title: 'Guardian Spirit',
    artistName: 'Tendai Mukamuri',
    medium: 'Verdite Stone',
    category: 'sculpture',
    price: 3200,
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1549891472-713d9b516c2e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502780402662-acc01917286e?w=800&h=600&fit=crop'
    ],
    description: 'An elegant verdite sculpture depicting a protective spirit. The green stone\'s natural beauty is enhanced by masterful carving that brings out the spiritual essence of the guardian figure.',
    dimensions: {
      width: 35,
      height: 75,
      depth: 28,
      unit: 'cm'
    },
    materials: ['Verdite Stone', 'Natural Polish'],
    oneOfAKind: true,
    available: true,
    availability: 'available',
    culturalSignificance: 'Guardian spirits are believed to protect families and communities in Shona tradition',
    yearCreated: 2023,
    weight: 18,
    tags: ['sculpture', 'verdite', 'spiritual', 'guardian', 'traditional'],
    createdAt: '2023-10-08T10:30:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '8',
    title: 'Market Day Dreams',
    artistName: 'Chipo Chikonzo',
    medium: 'Oil on Canvas',
    category: 'painting',
    price: 2100,
    imageUrl: 'https://images.unsplash.com/photo-1549891472-713d9b516c2e?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1549891472-713d9b516c2e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502780402662-acc01917286e?w=800&h=600&fit=crop'
    ],
    description: 'A vibrant oil painting capturing the energy and color of a traditional Zimbabwean market. The detailed brushwork brings to life the vendors, customers, and the rich array of goods that make markets the heart of community life.',
    dimensions: {
      width: 100,
      height: 70,
      unit: 'cm'
    },
    materials: ['Oil Paint', 'Canvas', 'Wooden Frame'],
    oneOfAKind: true,
    available: true,
    availability: 'available',
    culturalSignificance: 'Markets are central to Zimbabwean social and economic life, places of community gathering',
    yearCreated: 2024,
    weight: 4,
    tags: ['painting', 'oil', 'market', 'community', 'vibrant'],
    createdAt: '2024-02-28T14:00:00Z',
    updatedAt: '2024-03-05T10:20:00Z'
  }
]; 