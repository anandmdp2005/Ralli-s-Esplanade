export interface MenuItem {
  id: string;
  name: string;
  category: 'specialties' | 'mains' | 'tandoor' | 'biryani' | 'breads' | 'desserts_beverages';
  description: string;
  dietary: 'veg' | 'non-veg';
  isChefSpecial?: boolean;
  priceNote: string;
  imageUrl: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  description: string;
}

export const MENU_CATEGORIES: MenuCategory[] = [
  { id: 'all', name: 'All Offerings', description: 'Explore our complete dining and refreshment menu' },
  { id: 'specialties', name: 'Signature Specialties', description: 'Time-honored delicacies favored by Esplanade diners' },
  { id: 'biryani', name: 'Biryani & Rice', description: 'Fragrant long-grain rice dishes with traditional spices' },
  { id: 'tandoor', name: 'Tandoor & Starters', description: 'Marinated slow-roasted kebabs and grilled vegetarian classics' },
  { id: 'mains', name: 'Classic Curries', description: 'Rich gravies simmered with aromatic heritage spices' },
  { id: 'breads', name: 'Tandoori Breads', description: 'Freshly baked naans, kulchas, and layered parathas' },
  { id: 'desserts_beverages', name: 'Beverages & Desserts', description: 'Cooling lassis, artisanal desserts, and traditional refreshments' },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'biryani-01',
    name: 'Kolkata Special Awadhi Biryani',
    category: 'biryani',
    description: 'Fragrant basmati rice cooked on dum with delicate whole spices, tender cuts, saffron infusion, and the iconic golden potato.',
    dietary: 'non-veg',
    isChefSpecial: true,
    priceNote: 'Verified In-Restaurant Rate (Ask Server)',
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'biryani-02',
    name: 'Shahi Subz Dum Biryani',
    category: 'biryani',
    description: 'Fresh seasonal vegetables, paneer chunks, and long-grain basmati infused with rose water, green cardamom, and crispy fried onions.',
    dietary: 'veg',
    priceNote: 'Verified In-Restaurant Rate (Ask Server)',
    imageUrl: 'https://images.unsplash.com/photo-1642821373181-696a54913e9a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'tandoor-01',
    name: 'Paneer Malai Tikka',
    category: 'tandoor',
    description: 'Soft cottage cheese cubes marinated in clotted cream, crushed green cardamom, roasted gram flour, and hung curd, charred over coals.',
    dietary: 'veg',
    isChefSpecial: true,
    priceNote: 'Verified In-Restaurant Rate (Ask Server)',
    imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'tandoor-02',
    name: 'Murgh Reshmi Kebab',
    category: 'tandoor',
    description: 'Silken minced chicken skewers infused with roasted cashews, crushed white pepper, fresh coriander, and melted butter.',
    dietary: 'non-veg',
    priceNote: 'Verified In-Restaurant Rate (Ask Server)',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mains-01',
    name: 'Dal Makhani Ralli Classic',
    category: 'mains',
    description: 'Black lentils and kidney beans slow-simmered overnight over smoldering tandoor embers with ripe tomatoes and churned white butter.',
    dietary: 'veg',
    isChefSpecial: true,
    priceNote: 'Verified In-Restaurant Rate (Ask Server)',
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mains-02',
    name: 'Butter Chicken Masala',
    category: 'mains',
    description: 'Tandoori-roasted chicken pieces finished in a velvety, mildly spiced makhani gravy enriched with fresh cream and dried kasuri methi.',
    dietary: 'non-veg',
    priceNote: 'Verified In-Restaurant Rate (Ask Server)',
    imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mains-03',
    name: 'Paneer Lababdar',
    category: 'mains',
    description: 'Fresh paneer folded into a coarse onion-tomato gravy with grated cottage cheese, cashew paste, and aromatic garbh masala.',
    dietary: 'veg',
    priceNote: 'Verified In-Restaurant Rate (Ask Server)',
    imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'specialties-01',
    name: 'Esplanade Mumbai-Style Pav Bhaji',
    category: 'specialties',
    description: 'Mashed spiced garden vegetable medley cooked on a massive iron tawa with generous dollops of butter, served with toasted ladi pav.',
    dietary: 'veg',
    isChefSpecial: true,
    priceNote: 'Verified In-Restaurant Rate (Ask Server)',
    imageUrl: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'specialties-02',
    name: 'Kolkata Street Chaat Platter',
    category: 'specialties',
    description: 'Crisp puris with seasoned potatoes, chilled spiced yogurt, sweet tamarind chutney, mint relish, and fine sev.',
    dietary: 'veg',
    priceNote: 'Verified In-Restaurant Rate (Ask Server)',
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'breads-01',
    name: 'Butter & Garlic Naan',
    category: 'breads',
    description: 'Clay-oven baked leavened bread brushed generously with pure butter and crushed charred garlic flakes.',
    dietary: 'veg',
    priceNote: 'Verified In-Restaurant Rate (Ask Server)',
    imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'breads-02',
    name: 'Amritsari Kulcha',
    category: 'breads',
    description: 'Crisp layered tandoor bread stuffed with spiced mashed potatoes, pomegranate seeds, and fresh green chilies.',
    dietary: 'veg',
    priceNote: 'Verified In-Restaurant Rate (Ask Server)',
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'desserts_beverages-01',
    name: 'Royal Kesar Badam Lassi',
    category: 'desserts_beverages',
    description: 'Thick hand-churned sweet curd blended with saffron strands, crushed almonds, pistachios, and a touch of cardamom.',
    dietary: 'veg',
    isChefSpecial: true,
    priceNote: 'Verified In-Restaurant Rate (Ask Server)',
    imageUrl: 'https://images.unsplash.com/photo-1571006687898-3bfd217358e7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'desserts_beverages-02',
    name: 'Traditional Rabdi Kulfi Falooda',
    category: 'desserts_beverages',
    description: 'Dense homemade malai kulfi served over chilled rose falooda vermicelli, basil seeds, and thick condensed milk rabdi.',
    dietary: 'veg',
    priceNote: 'Verified In-Restaurant Rate (Ask Server)',
    imageUrl: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80',
  },
];

export const RESTAURANT_INFO = {
  name: "Ralli's Esplanade",
  tagline: 'Authentic Flavors & Gracious Hospitality in the Heart of Chowringhee, Kolkata',
  shortBio:
    "Located at 10-D Jawahar Lal Nehru Road, Chowringhee Place, Ralli's Esplanade is a cherished dining destination in central Kolkata. We take pride in serving wholesome dishes, fresh refreshments, and delicious meals in a warm, welcoming atmosphere.",
  phone: '09831222607',
  formattedPhone: '09831 222607',
  displayPhone: '+91 98312 22607',
  address: '10-D, Jawahar Lal Nehru Road, Chowringhee Pl, Kolkata, West Bengal 700013',
  googleMapsLink: 'https://maps.app.goo.gl/5pbVMNEYUzhKXDxr7',
  googleRating: 5.0,
  googleReviewCount: 1349,
  landmark: 'Opposite Esplanade Metro Station, adjacent to Chowringhee Place',
  hours: {
    regular: 'Monday – Sunday: 11:00 AM – 11:00 PM',
    kitchen: 'Last kitchen order: 10:30 PM',
    note: 'Dining hours verified as supplied. Guests are encouraged to call ahead for holiday schedules.',
  },
  features: [
    { title: 'Prime Esplanade Location', description: 'Steps from Esplanade Metro and New Market on historic Chowringhee.' },
    { title: 'Diverse Menu Choices', description: 'Freshly prepared vegetarian & non-vegetarian delicacies cooked with premium ingredients.' },
    { title: 'Generous Hospitality', description: 'Attentive service dedicated to families, working professionals, and city explorers.' },
    { title: 'Dine-In & Takeaway', description: 'Comfortable indoor seating alongside swift takeaway packaging for on-the-go patrons.' },
  ],
};
