export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isSignature: boolean;
  badge?: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  date: string;
  avatar: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: 'food' | 'drinks' | 'ambience' | 'interior';
}

export interface SpecialItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tagline: string;
  highlights: string[];
}

export interface WhyUsItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  image?: string;
}
