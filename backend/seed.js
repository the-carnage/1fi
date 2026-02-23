const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/onefi';

const products = [
  {
    name: 'Apple iPhone 17 Pro',
    slug: 'iphone-17-pro',
    brand: 'Apple',
    category: 'Smartphones',
    description: 'The most advanced iPhone ever with titanium design, A18 Pro chip, and revolutionary camera system.',
    variants: [
      {
        variantName: 'Silver 256GB',
        storage: '256GB',
        color: 'Silver',
        colorHex: '#E3E4E5',
        mrp: 144900,
        price: 134900,
        images: [
          'https://images.unsplash.com/photo-1678652197831-2d180705cd2c?w=800',
          'https://images.unsplash.com/photo-1678652197838-b5d1d8c1b95a?w=800'
        ]
      },
      {
        variantName: 'Desert Gold 256GB',
        storage: '256GB',
        color: 'Desert Gold',
        colorHex: '#F4E4C1',
        mrp: 144900,
        price: 134900,
        images: [
          'https://images.unsplash.com/photo-1696446702183-cbd50c2a8d66?w=800',
          'https://images.unsplash.com/photo-1696446702189-2b0e4b6d3c78?w=800'
        ]
      },
      {
        variantName: 'Space Black 256GB',
        storage: '256GB',
        color: 'Space Black',
        colorHex: '#2C2C2E',
        mrp: 144900,
        price: 134900,
        images: [
          'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=800',
          'https://images.unsplash.com/photo-1592286927505-b0e2cv67d14b?w=800'
        ]
      }
    ],
    emiPlans: [
      { tenure: 3, monthlyAmount: 44967, interestRate: 0, cashback: true, cashbackAmount: 2000 },
      { tenure: 6, monthlyAmount: 22483, interestRate: 0, cashback: true, cashbackAmount: 3000 },
      { tenure: 12, monthlyAmount: 11242, interestRate: 0, cashback: false, cashbackAmount: 0 },
      { tenure: 24, monthlyAmount: 5621, interestRate: 0, cashback: false, cashbackAmount: 0 },
      { tenure: 36, monthlyAmount: 4247, interestRate: 10.5, cashback: false, cashbackAmount: 0 },
      { tenure: 48, monthlyAmount: 3435, interestRate: 10.5, cashback: false, cashbackAmount: 0 }
    ]
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    slug: 'samsung-s24-ultra',
    brand: 'Samsung',
    category: 'Smartphones',
    description: 'Ultimate flagship with S Pen, 200MP camera, and Galaxy AI features for enhanced productivity.',
    variants: [
      {
        variantName: 'Titanium Gray 256GB',
        storage: '256GB',
        color: 'Titanium Gray',
        colorHex: '#5F6368',
        mrp: 129999,
        price: 119999,
        images: [
          'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800',
          'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800'
        ]
      },
      {
        variantName: 'Titanium Violet 512GB',
        storage: '512GB',
        color: 'Titanium Violet',
        colorHex: '#8B7BA8',
        mrp: 139999,
        price: 129999,
        images: [
          'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
          'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800'
        ]
      }
    ],
    emiPlans: [
      { tenure: 3, monthlyAmount: 40000, interestRate: 0, cashback: true, cashbackAmount: 1500 },
      { tenure: 6, monthlyAmount: 20000, interestRate: 0, cashback: true, cashbackAmount: 2500 },
      { tenure: 12, monthlyAmount: 10000, interestRate: 0, cashback: false, cashbackAmount: 0 },
      { tenure: 24, monthlyAmount: 5417, interestRate: 5, cashback: false, cashbackAmount: 0 },
      { tenure: 36, monthlyAmount: 3778, interestRate: 10.5, cashback: false, cashbackAmount: 0 }
    ]
  }
];

products.push({
  name: 'OnePlus 13',
  slug: 'oneplus-13',
  brand: 'OnePlus',
  category: 'Smartphones',
  description: 'Flagship killer with Snapdragon 8 Gen 3, Hasselblad camera, and blazing fast 100W charging.',
  variants: [
    {
      variantName: 'Midnight Ocean 256GB',
      storage: '256GB',
      color: 'Midnight Ocean',
      colorHex: '#1A3A52',
      mrp: 69999,
      price: 64999,
      images: [
        'https://images.unsplash.com/photo-1581993192008-63e896f4f744?w=800',
        'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800'
      ]
    },
    {
      variantName: 'Arctic Dawn 256GB',
      storage: '256GB',
      color: 'Arctic Dawn',
      colorHex: '#E8F1F5',
      mrp: 69999,
      price: 64999,
      images: [
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
        'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800'
      ]
    }
  ],
  emiPlans: [
    { tenure: 3, monthlyAmount: 21667, interestRate: 0, cashback: true, cashbackAmount: 1000 },
    { tenure: 6, monthlyAmount: 10833, interestRate: 0, cashback: true, cashbackAmount: 1500 },
    { tenure: 12, monthlyAmount: 5417, interestRate: 0, cashback: false, cashbackAmount: 0 },
    { tenure: 24, monthlyAmount: 2917, interestRate: 5, cashback: false, cashbackAmount: 0 },
    { tenure: 36, monthlyAmount: 2042, interestRate: 10.5, cashback: false, cashbackAmount: 0 }
  ]
});

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('connected to mongodb');

    await Product.deleteMany({});
    console.log('cleared existing products');

    await Product.insertMany(products);
    console.log('seeded 3 products successfully');

    mongoose.connection.close();
    console.log('database connection closed');
  } catch (error) {
    console.error('seeding error:', error);
    process.exit(1);
  }
}

seedDatabase();
