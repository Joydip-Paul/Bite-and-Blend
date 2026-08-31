export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  featured?: boolean;
}

export const PRODUCTS: readonly Product[] = [
  {
    id: 1,
    name: 'Mango Sunshine Juice',
    category: 'Juice',
    price: 140,
    image: 'assets/icons/juice.svg',
    description: 'Fresh mango blended with citrus and a hint of ginger with a touch of honey',
    featured: true,
  },
  {
    id: 2,
    name: 'Berry Blast Smoothie',
    category: 'Juice',
    price: 180,
    image: 'assets/icons/juice.svg',
    description: 'Mixed berries, yogurt and honey',
  },
  {
    id: 3,
    name: 'Classic Beef Burger',
    category: 'Burger',
    price: 260,
    image: 'assets/icons/burger.svg',
    description: 'Juicy beef patty with signature sauce',
    featured: true,
  },
  {
    id: 4,
    name: 'Crispy Chicken Burger',
    category: 'Burger',
    price: 230,
    image: 'assets/icons/burger.svg',
    description: 'Crunchy chicken, lettuce and cheese',
  },
  {
    id: 5,
    name: 'Bite & Blend Combo',
    category: 'Combo Meal',
    price: 390,
    image: 'assets/icons/combo-meal.svg',
    description: 'Burger, crispy fries and fresh juice',
    featured: true,
  },
  {
    id: 6,
    name: 'Chicken Cheese Combo',
    category: 'Combo Meal',
    price: 350,
    image: 'assets/icons/combo-meal.svg',
    description: 'Chicken burger, fries and a cold drink',
  },
  {
    id: 7,
    name: 'Grilled Club Sandwich',
    category: 'Sandwich',
    price: 220,
    image: 'assets/icons/sandwich.svg',
    description: 'Grilled chicken with fresh vegetables',
  },
  {
    id: 8,
    name: 'Spicy Chicken Sandwich',
    category: 'Sandwich',
    price: 200,
    image: 'assets/icons/sandwich.svg',
    description: 'Spicy chicken in toasted bread',
  },
  {
    id: 9,
    name: 'Steamed Chicken Momo',
    category: 'Momo',
    price: 190,
    image: 'assets/icons/momo.svg',
    description: 'Six juicy momos with spicy chutney',
    featured: true,
  },
  {
    id: 10,
    name: 'Fried Momo Platter',
    category: 'Momo',
    price: 220,
    image: 'assets/icons/momo.svg',
    description: 'Golden fried momos with house dip',
  },
  {
    id: 11,
    name: 'Loaded Masala Fries',
    category: 'Snacks',
    price: 160,
    image: 'assets/icons/snacks.svg',
    description: 'Crispy fries with masala seasoning',
  },
  {
    id: 12,
    name: 'Crispy Snack Box',
    category: 'Snacks',
    price: 280,
    image: 'assets/icons/snacks.svg',
    description: 'A shareable mix of crispy favourites',
  },
];
