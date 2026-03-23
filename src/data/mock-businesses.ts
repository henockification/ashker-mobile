export type Business = {
  id: string;
  name: string;
  category: string;
  city: string;
  rating: number;
  reviews: number;
  price: '$' | '$$' | '$$$';
  savedBy: number;
  address: string;
  heroSubtitle: string;
  photos?: string[];
  recentReviews?: {
    id: string;
    author: string;
    rating: number;
    text: string;
    createdAt: string;
  }[];
};

export const MOCK_BUSINESSES: Business[] = [
  {
    id: '1',
    name: 'Aster Coffee House',
    category: 'Coffee & Tea',
    city: 'Addis Ababa',
    rating: 4.7,
    reviews: 184,
    price: '$$',
    savedBy: 62,
    address: 'Bole Rd, Addis Ababa',
    heroSubtitle: 'Specialty coffee and brunch classics',
    photos: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1461988091159-192b6df7054f?auto=format&fit=crop&w=1400&q=80',
    ],
    recentReviews: [
      {
        id: 'r-1',
        author: 'Sarah L.',
        rating: 5,
        text: 'Great espresso and warm service. The brunch plate was also excellent.',
        createdAt: '2 days ago',
      },
      {
        id: 'r-2',
        author: 'Mikael A.',
        rating: 4,
        text: 'Nice atmosphere for meetings, though it gets crowded after lunch.',
        createdAt: '1 week ago',
      },
    ],
  },
  {
    id: '2',
    name: 'Lakeview Brunch Club',
    category: 'Breakfast & Brunch',
    city: 'Chicago',
    rating: 4.5,
    reviews: 231,
    price: '$$',
    savedBy: 91,
    address: 'Evergreen Ct, Chicago, IL',
    heroSubtitle: 'Weekend brunch with city views',
    photos: [
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=1400&q=80',
    ],
    recentReviews: [
      {
        id: 'r-3',
        author: 'Daniel K.',
        rating: 4,
        text: 'Friendly staff and good portions. Coffee could be stronger.',
        createdAt: '3 days ago',
      },
    ],
  },
  {
    id: '3',
    name: 'Bole Pasta Kitchen',
    category: 'Italian',
    city: 'Addis Ababa',
    rating: 4.3,
    reviews: 98,
    price: '$$',
    savedBy: 38,
    address: 'Kazanchis, Addis Ababa',
    heroSubtitle: 'Fresh pasta and cozy date-night tables',
    photos: [],
  },
  {
    id: '4',
    name: 'Roosevelt Rooftop',
    category: 'Bars',
    city: 'New York',
    rating: 4.6,
    reviews: 310,
    price: '$$$',
    savedBy: 127,
    address: 'Roosevelt Ave, New York, NY',
    heroSubtitle: 'Craft cocktails above Manhattan',
    photos: [],
  },
];

export function getBusinessById(id: string) {
  return MOCK_BUSINESSES.find((item) => item.id === id);
}
