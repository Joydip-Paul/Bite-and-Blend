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
    name: 'Lemonade',
    category: 'Juice',
    price: 30,
    image: 'assets/img/products/lemonade.png',
    description: 'Fresh lemonade with a refreshing citrus taste',
    featured: true,
  },
  {
    id: 2,
    name: 'Mint Lemonade',
    category: 'Juice',
    price: 40,
    image: 'assets/img/products/mint-lemonade.png',
    description: 'Fresh lemon blended with mint leaves',
  },
  {
    id: 3,
    name: 'Orange Juice',
    category: 'Juice',
    price: 50,
    image: 'assets/img/products/orange-juice.png',
    description: 'Fresh orange juice made from ripe oranges',
  },
  {
    id: 4,
    name: 'Apple Juice',
    category: 'Juice',
    price: 50,
    image: 'assets/img/products/apple-juice.png',
    description: 'Fresh apple juice with natural sweetness',
  },
  {
    id: 5,
    name: 'Mix Juice',
    category: 'Juice',
    price: 40,
    image: 'assets/img/products/mix-juice.png',
    description: 'A delicious blend of fresh seasonal fruits',
  },

  {
    id: 6,
    name: 'Pepe Milk Shake',
    category: 'Milk Shake',
    price: 45,
    image: 'assets/img/products/pepe-milk-shake.png',
    description: 'Creamy papaya milk shake',
  },
  {
    id: 7,
    name: 'Mango Milk Shake',
    category: 'Milk Shake',
    price: 50,
    image: 'assets/img/products/mango-milk-shake.png',
    description: 'Rich mango blended with fresh milk',
    featured: true,
  },
  {
    id: 8,
    name: 'Dragon Milk Shake',
    category: 'Milk Shake',
    price: 45,
    image: 'assets/img/products/dragon-milk-shake.png',
    description: 'Refreshing dragon fruit milk shake',
  },
  {
    id: 9,
    name: 'Watermelon Milk Shake',
    category: 'Milk Shake',
    price: 50,
    image: 'assets/img/products/watermelon-milk-shake.png',
    description: 'Sweet watermelon blended with milk',
  },

  {
    id: 10,
    name: 'Doi Chira',
    category: 'Doi Chira',
    price: 45,
    image: 'assets/img/products/doi-chira.png',
    description: 'Traditional doi chira with fresh yogurt',
    featured: true,
  },
  {
    id: 11,
    name: 'Special Doi Chira',
    category: 'Doi Chira',
    price: 60,
    image: 'assets/img/products/special-doi-chira.png',
    description: 'Special doi chira with premium toppings',
  },

  {
    id: 12,
    name: 'Chicken Burger',
    category: 'Burger',
    price: 80,
    image: 'assets/img/products/sub-burger.png',
    description: 'Soft bun with crispy chicken and special sauce',
    featured: true,
  },

  {
    id: 13,
    name: 'Chicken Sandwich',
    category: 'Sandwich',
    price: 70,
    image: 'assets/img/products/sub-sandwich.png',
    description: 'Fresh chicken sandwich with vegetables',
  },

  {
    id: 14,
    name: 'Set Menu One',
    category: 'Combo Meal',
    price: 150,
    image: 'assets/icons/combo-meal.svg',
    description: 'Chicken burger, sandwich and refreshing drink',
    featured: true,
  },
  {
    id: 15,
    name: 'Set Menu Two',
    category: 'Combo Meal',
    price: 170,
    image: 'assets/icons/combo-meal.svg',
    description: 'Special combo meal with extra items',
  },
];