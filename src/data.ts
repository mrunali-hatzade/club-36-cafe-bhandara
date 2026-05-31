import { MenuItem, Review, GalleryItem, SpecialItem, WhyUsItem } from './types';

export const whyUsData: WhyUsItem[] = [
  {
    id: 'w1',
    title: 'Cozy Ambience',
    description: 'Aesthetically pleasing, warm-lit interior with green foliage and premium glassmorphism accents — perfect for both working and chilling with friends.',
    iconName: 'Coffee',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600'
  },
  {
    id: 'w2',
    title: 'Delicious Food',
    description: 'Cooked fresh by professional chefs with secret local seasonings, rich ingredients, and modern presentation.',
    iconName: 'Utensils',
    image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=600'
  },
  {
    id: 'w3',
    title: 'Refreshing Drinks',
    description: 'Expertly brewed artisanal lattes, dynamic seasonal mocktails, and cooling premium milkshakes made to brighten your day.',
    iconName: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=600'
  },
  {
    id: 'w4',
    title: 'Friendly Staff',
    description: 'Our energetic and hospitable crew ensures a welcoming youth-focused atmosphere and excellent tableside service.',
    iconName: 'Heart',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600'
  },
  {
    id: 'w5',
    title: 'Affordable Pricing',
    description: 'Premium gourmet quality and generous portions priced moderately for student groupings and family budgets.',
    iconName: 'Banknote',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=600'
  },
  {
    id: 'w6',
    title: 'Great Customer Reviews',
    description: 'Proudly rated 4.8★ by cafe lovers across Bhandara for consistent flavor profile, hygiene, and friendly vibes.',
    iconName: 'Award',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600'
  }
];

export const menuCategories = [
  { id: 'all', name: 'All Items' },
  { id: 'coffee', name: 'Artisanal Coffee' },
  { id: 'cold-coffee', name: 'Thick Cold Coffee' },
  { id: 'mocktails', name: 'Signature Mocktails' },
  { id: 'shakes', name: 'Decadent Shakes' },
  { id: 'burgers', name: 'Gourmet Burgers' },
  { id: 'pizza', name: 'Wood-fired Pizza' },
  { id: 'sandwiches', name: 'Toasted Sandwiches' },
  { id: 'pasta', name: 'Creamy Pasta' },
  { id: 'fries', name: 'Crispy Fries' },
  { id: 'desserts', name: 'Sweet Delights' }
];

export const menuItems: MenuItem[] = [
  // COFFEE
  {
    id: 'm1',
    name: 'Artisanal Hot Cappuccino',
    description: 'Freshly ground double arabica espresso layer with velvety steamed microfoam and premium cocoa dust.',
    price: 99,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800',
    isSignature: false
  },
  {
    id: 'm2',
    name: 'Hazelnut Latte Premium',
    description: 'Rich freshly brewed café latte infused with a premium roasted French hazelnut syrup shot.',
    price: 129,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=800',
    isSignature: true,
    badge: 'Bestseller'
  },
  
  // COLD COFFEE
  {
    id: 'm3',
    name: 'Classic Irish Cold Coffee',
    description: 'Double espresso blended with rich vanilla bean cream and Irish syrup essence, topped with premium chocolate curls.',
    price: 139,
    category: 'cold-coffee',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=800',
    isSignature: false
  },
  {
    id: 'm4',
    name: 'Club 36 Devil Frappe',
    description: 'Decadent loaded cold brew with dark chocolate syrup, chocolate chip cookies, and premium vanilla ice cream float.',
    price: 169,
    category: 'cold-coffee',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800',
    isSignature: true,
    badge: 'Signature'
  },

  // MOCKTAILS
  {
    id: 'm5',
    name: 'Refreshing Cranberry Mint Mojito',
    description: 'Fresh crushed mint leaves, lime juice, and tart sweet cranberry juice splash, topped with tonic over crushed ice.',
    price: 129,
    category: 'mocktails',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800',
    isSignature: false
  },
  {
    id: 'm6',
    name: 'Blue Lagoon Bliss',
    description: 'Tropical classic featuring sparkling blue curacao, freshly squeezed key lemon, and sprite fizz.',
    price: 119,
    category: 'mocktails',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=800',
    isSignature: true,
    badge: 'Trending'
  },

  // SHAKES
  {
    id: 'm7',
    name: 'Decadent KitKat Shake',
    description: 'Crunchy crushed KitKat bars spun together with thick gourmet vanilla milk base, layered with rich fudge swirls.',
    price: 149,
    category: 'shakes',
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=800',
    isSignature: false
  },
  {
    id: 'm8',
    name: 'Aesthetic Lotus Biscoff Shake',
    description: 'Velvety cream shake blended with authentic Biscoff cookies and premium cookie butter drizzle.',
    price: 179,
    category: 'shakes',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=800',
    isSignature: true,
    badge: 'Chef Special'
  },

  // BURGERS
  {
    id: 'm9',
    name: 'Club 36 Ultimate Veg Burger',
    description: 'Crispy mixed vegetable potato patty topped with sliced cheddar, secret spicy sauce, tomatoes, onions, toasted brioche.',
    price: 119,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=800',
    isSignature: false
  },
  {
    id: 'm10',
    name: 'Crunchy Double Cheese Chicken Burger',
    description: 'Juicy, southern-fried country chicken fillet on fresh toasted brioche with smoky honey mustard, triple cheese, pickles.',
    price: 189,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800',
    isSignature: true,
    badge: 'Must Try'
  },

  // PIZZA
  {
    id: 'm11',
    name: 'Classic Margherita Woodfired Pizza',
    description: 'Hand-stretched sourdough crust covered in Italian marinara sauce, fresh basil branches, and dynamic mozzarella pools.',
    price: 199,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=800',
    isSignature: false
  },
  {
    id: 'm12',
    name: 'Club 36 Hot Supreme Pizza',
    description: 'Loaded with spicy paneer tikka, sweet gold corn kernels, crunchy capsicum, black olives, and premium cheese pull.',
    price: 249,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800',
    isSignature: true,
    badge: 'Bestseller'
  },

  // SANDWICHES
  {
    id: 'm13',
    name: 'Gourmet Bombay Grill Sandwich',
    description: 'Triple-layered toasted sourdough stuffed with mashed potato masala, fresh cucumber rings, tomatoes, and spicy mint chutney.',
    price: 99,
    category: 'sandwiches',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=800',
    isSignature: false
  },
  {
    id: 'm14',
    name: 'Tandoori Paneer Club Sandwich',
    description: 'Toasted pan-grilled sandwich packed with marinated flame-grilled paneer tikka cubes, crunchy iceberg lettuce, and herb mayo.',
    price: 139,
    category: 'sandwiches',
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?q=80&w=800',
    isSignature: true,
    badge: 'Spicy'
  },

  // PASTA
  {
    id: 'm15',
    name: 'Arrabbiata Spicy Red Sauce Pasta',
    description: 'Penne pasta tossed in garlic infused spicy san marzano red tomato gravy with premium olives and grated cheese.',
    price: 149,
    category: 'pasta',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800',
    isSignature: false
  },
  {
    id: 'm16',
    name: 'Signature Creamy Alfredo White Pasta',
    description: 'Dreamy, silky butter-parmesan cream sauce blanketing imported penne pasta with garlic mushrooms and sweet peppers.',
    price: 179,
    category: 'pasta',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=800',
    isSignature: true,
    badge: 'Creamiest'
  },

  // FRIES
  {
    id: 'm17',
    name: 'In-House Salted Crispy Fries',
    description: 'Golden, crispy premium potato fries deep fried to a tender state, tossed in pink rock salt seasoning.',
    price: 79,
    category: 'fries',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=800',
    isSignature: false
  },
  {
    id: 'm18',
    name: 'Loaded Hot Cheese & Peri Peri Fries',
    description: 'Vibrant crispy fries dressed with hot cheddar cheese sauce and a heavy dusting of aromatic spice blend.',
    price: 119,
    category: 'fries',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?q=80&w=800',
    isSignature: true,
    badge: 'Crowd Favorite'
  },

  // DESSERTS
  {
    id: 'm19',
    name: 'Decadent Chocolate Lava Muffin',
    description: 'Rich dark cocoa muffin baked perfectly with an intensely gooey, hot flowing chocolate core.',
    price: 89,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800',
    isSignature: false
  },
  {
    id: 'm20',
    name: 'Sizzling Fudge Brownie with Ice Cream',
    description: 'An elite plate containing our baked walnut brownie served on a piping hot iron skid with cold vanilla ice cream and streaming chocolate sizzle.',
    price: 159,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800',
    isSignature: true,
    badge: 'Legendary'
  }
];

export const signatureSpecials: SpecialItem[] = [
  {
    id: 'spec-1',
    name: 'Club 36 Royal Tower Burger',
    description: 'Our absolute masterpiece. Beautifully crispy spiced double house veg patties, two sheets of melting English cheddar, handcrafted crunchy onion rings, fresh key garden lettuce, and our legendary proprietary secret pink burger glaze layered in premium buttered brioche.',
    price: 219,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800',
    tagline: 'Crafted for True Food Enthusiasts',
    highlights: ['Double Melting Cheese Layers', 'Proprietary Smoky Pink Sauce', 'Toasted Brioche Buns', 'Crispy Golden Fries Side']
  },
  {
    id: 'spec-2',
    name: 'The Legendary Iron Sizzling Brownie',
    description: 'A sensory spectacle. Decadent, soft homemade dark chocolate walnut brownie placed on a sizzling hot cast iron plate, topped with a scoop of premium Madagascar vanilla bean gelato, and tableside poured with molten rich Belgian dark chocolate.',
    price: 159,
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800',
    tagline: 'Bhandara\'s Favorite Showstopper Dessert',
    highlights: ['Piping Hot Iron Plate Cooked', 'Rich Belgian Dark Chocolate Sauce', 'Madagascar Vanilla Gelato Float', 'Crushed Toasted Walnuts']
  },
  {
    id: 'spec-3',
    name: 'Lotus Biscoff Dream Extreme Frappe',
    description: 'An opulent beverage experience. A thick blend of real Belgian caramelized Biscoff cookie paste, double ristretto espresso, premium vanilla malt syrup base, layered with whipped fresh cream, visual biscoff dust, and a whole original biscuit.',
    price: 179,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=800',
    tagline: 'Pure Liquid Joy in a Premium Jar',
    highlights: ['Imported Belgian Biscuit Paste', 'Rich Espresso Ristretto Swirls', 'Chilled Whipped Cream Crown', 'Perfect Sweet/Salty Equilibrium']
  }
];

export const reviewsData: Review[] = [
  {
    id: 'r1',
    name: 'Aniruddha Deshmukh',
    role: 'Local Guide',
    comment: 'Undoubtedly the best cafe in Bhandara! The cozy vibes and seating layout make it perfect for weekend meetups. Their Club 36 Devil Frappe is a masterpiece, and prices are super affordable compared to quality.',
    rating: 5,
    date: '1 week ago',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150'
  },
  {
    id: 'r2',
    name: 'Pranjal Soni',
    role: 'College Student',
    comment: 'The interior is highly aesthetic with that warm cream color palette and lots of green plants. I study here frequently during mornings. Highly recommend the Peri Peri Fries and Alfredo White Sauce Pasta - so creamy! ❤️',
    rating: 5,
    date: '3 days ago',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150'
  },
  {
    id: 'r3',
    name: 'Sumit Hatwar',
    role: 'Food Blogger',
    comment: 'Tried their signature Tower Burger and the sizzling brownie. The brownie presentation is outstanding, and the taste matches. Staff is interactive and friendly. Bhandara needed a beautiful spot like this!',
    rating: 5,
    date: '2 weeks ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150'
  },
  {
    id: 'r4',
    name: 'Mrunali Hatwar',
    role: 'Frequent Customer',
    comment: 'The vibes are very refreshing. Perfect space for organizing small birthday parties or playing board games. The mocktails are so pretty and perfect for Instagram photos. Definitely visiting weekly!',
    rating: 5,
    date: '4 days ago',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150'
  }
];

export const galleryItems: GalleryItem[] = [
  {
    id: 'g1',
    url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800',
    title: 'Aesthetic Warm Seating Space',
    category: 'interior'
  },
  {
    id: 'g2',
    url: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800',
    title: 'Artisanal Latte Magic',
    category: 'food'
  },
  {
    id: 'g3',
    url: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=800',
    title: 'Vibrant Fruit Craft Mocktails',
    category: 'drinks'
  },
  {
    id: 'g5',
    url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800',
    title: 'Gourmet Double Cheese Burger',
    category: 'food'
  },
  {
    id: 'g6',
    url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800',
    title: 'Woodfired Supreme Pizza Slice',
    category: 'food'
  },
  {
    id: 'g7',
    url: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=800',
    title: 'Foliage and Ambient Lights',
    category: 'ambience'
  },
  {
    id: 'g8',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800',
    title: 'Vibrancy, Conversations & Youth Vibe',
    category: 'ambience'
  },
  {
    id: 'g9',
    url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=800',
    title: 'Biscoff Shake Decadence',
    category: 'drinks'
  },
  {
    id: 'g10',
    url: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=800',
    title: 'Warm Rustic Counter Decor',
    category: 'interior'
  }
];

export const instagramPosts = [
  { id: 'ig1', url: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=600', likes: '1.2k', comments: 45 },
  { id: 'ig2', url: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=600', likes: '942', comments: 38 },
  { id: 'ig3', url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600', likes: '1.5k', comments: 64 },
  { id: 'ig4', url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600', likes: '1.1k', comments: 49 },
  { id: 'ig5', url: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=600', likes: '875', comments: 29 },
  { id: 'ig6', url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600', likes: '1.3k', comments: 55 }
];
