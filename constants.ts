import { City } from './types';

export const CITIES: City[] = [
  { name: 'Nairobi', slug: 'nairobi', description: 'The bustling capital city' },
  { name: 'Mombasa', slug: 'mombasa', description: 'Coastal city with rich history' },
  { name: 'Kisumu', slug: 'kisumu', description: 'Lakeside city on Victoria' },
  { name: 'Nakuru', slug: 'nakuru', description: 'Home of the flamingos' },
  { name: 'Eldoret', slug: 'eldoret', description: 'City of champions' },
  { name: 'Malindi', slug: 'malindi', description: 'Tropical paradise' },
  { name: 'Thika', slug: 'thika', description: 'Industrial hub' },
];

export const CATEGORY_COLORS: Record<string, string> = {
  Music: 'bg-purple-100 text-purple-800',
  Business: 'bg-blue-100 text-blue-800',
  Tech: 'bg-indigo-100 text-indigo-800',
  Art: 'bg-pink-100 text-pink-800',
  Social: 'bg-green-100 text-green-800',
  Sports: 'bg-orange-100 text-orange-800',
  Other: 'bg-gray-100 text-gray-800',
};
