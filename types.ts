export interface EventRequirement {
  type: string;
  description: string;
}

export interface EventData {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  city: string;
  description: string;
  category: 'Music' | 'Business' | 'Tech' | 'Art' | 'Social' | 'Sports' | 'Other';
  requirements: string[];
  imageUrl?: string;
  sourceUrl?: string;
}

export interface City {
  name: string;
  slug: string;
  description: string;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
