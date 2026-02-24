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


products.push(
{
  name: 'Google Pixel 9 Pro',
  slug: 'google-pixel-9-pro',
  brand: 'Google',
  category: 'Smartphones',
  description: 'Pure Android experience with AI photography and Tensor chip.',
  variants: [
    {
      variantName: 'Obsidian 256GB',
      storage: '256GB',
      color: 'Obsidian',
      colorHex: '#1C1C1E',
      mrp: 109999,
      price: 99999,
      images: [
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800'
      ]
    },
    {
      variantName: 'Porcelain 256GB',
      storage: '256GB',
      color: 'Porcelain',
      colorHex: '#F5F5F7',
      mrp: 109999,
      price: 99999,
      images: [
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800'
      ]
    }
  ],
  emiPlans: [
    { tenure: 3, monthlyAmount: 33333, interestRate: 0, cashback: true, cashbackAmount: 2000 },
    { tenure: 6, monthlyAmount: 16667, interestRate: 0, cashback: true, cashbackAmount: 2500 },
    { tenure: 12, monthlyAmount: 8333, interestRate: 0, cashback: false, cashbackAmount: 0 },
    { tenure: 24, monthlyAmount: 4500, interestRate: 5, cashback: false, cashbackAmount: 0 }
  ]
},

{
  name: 'iQOO 12',
  slug: 'iqoo-12',
  brand: 'iQOO',
  category: 'Smartphones',
  description: 'Performance beast powered by Snapdragon flagship processor.',
  variants: [
    {
      variantName: 'Legend White 256GB',
      storage: '256GB',
      color: 'Legend White',
      colorHex: '#FFFFFF',
      mrp: 57999,
      price: 52999,
      images: ['https://images.unsplash.com/photo-1510557880182-3f8f794b8e2f?w=800']
    },
    {
      variantName: 'Alpha Black 256GB',
      storage: '256GB',
      color: 'Alpha Black',
      colorHex: '#000000',
      mrp: 57999,
      price: 52999,
      images: ['https://images.unsplash.com/photo-1510557880182-3f8f794b8e2f?w=800']
    }
  ],
  emiPlans: [
    { tenure: 3, monthlyAmount: 17667, interestRate: 0, cashback: true, cashbackAmount: 800 },
    { tenure: 6, monthlyAmount: 8833, interestRate: 0, cashback: false, cashbackAmount: 0 },
    { tenure: 12, monthlyAmount: 4417, interestRate: 5, cashback: false, cashbackAmount: 0 }
  ]
},

{
  name: 'Xiaomi 14 Ultra',
  slug: 'xiaomi-14-ultra',
  brand: 'Xiaomi',
  category: 'Smartphones',
  description: 'Leica powered camera flagship with stunning display.',
  variants: [
    {
      variantName: 'Black 512GB',
      storage: '512GB',
      color: 'Black',
      colorHex: '#111111',
      mrp: 99999,
      price: 94999,
      images: ['https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800']
    }
  ],
  emiPlans: [
    { tenure: 6, monthlyAmount: 15833, interestRate: 0, cashback: true, cashbackAmount: 1500 },
    { tenure: 12, monthlyAmount: 7917, interestRate: 0, cashback: false, cashbackAmount: 0 },
    { tenure: 24, monthlyAmount: 4200, interestRate: 10.5, cashback: false, cashbackAmount: 0 }
  ]
},

{
  name: 'Realme GT 6',
  slug: 'realme-gt-6',
  brand: 'Realme',
  category: 'Smartphones',
  description: 'High refresh rate AMOLED with ultra fast charging.',
  variants: [
    {
      variantName: 'Racing Green 256GB',
      storage: '256GB',
      color: 'Racing Green',
      colorHex: '#0B6623',
      mrp: 39999,
      price: 36999,
      images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800']
    }
  ],
  emiPlans: [
    { tenure: 3, monthlyAmount: 12333, interestRate: 0, cashback: true, cashbackAmount: 500 },
    { tenure: 12, monthlyAmount: 3083, interestRate: 5, cashback: false, cashbackAmount: 0 }
  ]
},

{
  name: 'Nothing Phone (3)',
  slug: 'nothing-phone-3',
  brand: 'Nothing',
  category: 'Smartphones',
  description: 'Transparent design with Glyph interface.',
  variants: [
    {
      variantName: 'White 256GB',
      storage: '256GB',
      color: 'White',
      colorHex: '#F2F2F2',
      mrp: 49999,
      price: 45999,
      images: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800']
    }
  ],
  emiPlans: [
    { tenure: 6, monthlyAmount: 7667, interestRate: 0, cashback: true, cashbackAmount: 700 },
    { tenure: 12, monthlyAmount: 3833, interestRate: 5, cashback: false, cashbackAmount: 0 }
  ]
},

{
  name: 'Motorola Edge 50 Ultra',
  slug: 'motorola-edge-50-ultra',
  brand: 'Motorola',
  category: 'Smartphones',
  description: 'Premium curved display with clean Android.',
  variants: [
    {
      variantName: 'Forest Grey 256GB',
      storage: '256GB',
      color: 'Forest Grey',
      colorHex: '#3A3A3C',
      mrp: 59999,
      price: 54999,
      images: ['https://images.unsplash.com/photo-1581993192008-63e896f4f744?w=800']
    }
  ],
  emiPlans: [
    { tenure: 6, monthlyAmount: 9167, interestRate: 0, cashback: true, cashbackAmount: 900 },
    { tenure: 24, monthlyAmount: 2700, interestRate: 10.5, cashback: false, cashbackAmount: 0 }
  ]
},

{
  name: 'Vivo X100 Pro',
  slug: 'vivo-x100-pro',
  brand: 'Vivo',
  category: 'Smartphones',
  description: 'ZEISS optics with flagship photography experience.',
  variants: [
    {
      variantName: 'Asteroid Black 256GB',
      storage: '256GB',
      color: 'Asteroid Black',
      colorHex: '#101010',
      mrp: 89999,
      price: 84999,
      images: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800']
    }
  ],
  emiPlans: [
    { tenure: 3, monthlyAmount: 28333, interestRate: 0, cashback: true, cashbackAmount: 1200 },
    { tenure: 12, monthlyAmount: 7083, interestRate: 0, cashback: false, cashbackAmount: 0 }
  ]
},

{
  name: 'Oppo Find X7 Ultra',
  slug: 'oppo-find-x7-ultra',
  brand: 'Oppo',
  category: 'Smartphones',
  description: 'Flagship camera with periscope zoom.',
  variants: [
    {
      variantName: 'Ocean Blue 512GB',
      storage: '512GB',
      color: 'Ocean Blue',
      colorHex: '#005F73',
      mrp: 99999,
      price: 93999,
      images: ['https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800']
    }
  ],
  emiPlans: [
    { tenure: 6, monthlyAmount: 15667, interestRate: 0, cashback: true, cashbackAmount: 1300 },
    { tenure: 24, monthlyAmount: 4300, interestRate: 10.5, cashback: false, cashbackAmount: 0 }
  ]
},

{
  name: 'Asus ROG Phone 8',
  slug: 'asus-rog-phone-8',
  brand: 'Asus',
  category: 'Smartphones',
  description: 'Gaming focused flagship with advanced cooling.',
  variants: [
    {
      variantName: 'Phantom Black 512GB',
      storage: '512GB',
      color: 'Phantom Black',
      colorHex: '#000000',
      mrp: 94999,
      price: 89999,
      images: ['https://images.unsplash.com/photo-1510557880182-3f8f794b8e2f?w=800']
    }
  ],
  emiPlans: [
    { tenure: 3, monthlyAmount: 30000, interestRate: 0, cashback: true, cashbackAmount: 1000 },
    { tenure: 12, monthlyAmount: 7500, interestRate: 5, cashback: false, cashbackAmount: 0 }
  ]
},

{
  name: 'Poco F6 Pro',
  slug: 'poco-f6-pro',
  brand: 'Poco',
  category: 'Smartphones',
  description: 'Value flagship with powerful processor.',
  variants: [
    {
      variantName: 'Yellow 256GB',
      storage: '256GB',
      color: 'Yellow',
      colorHex: '#FFD60A',
      mrp: 42999,
      price: 39999,
      images: ['https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800']
    }
  ],
  emiPlans: [
    { tenure: 6, monthlyAmount: 6667, interestRate: 0, cashback: true, cashbackAmount: 600 },
    { tenure: 12, monthlyAmount: 3333, interestRate: 5, cashback: false, cashbackAmount: 0 }
  ]
}
);

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('connected to mongodb');

    await Product.deleteMany({});
    console.log('cleared existing products');

    await Product.insertMany(products);
    console.log('seeded 13 products successfully');

    mongoose.connection.close();
    console.log('database connection closed');
  } catch (error) {
    console.error('seeding error:', error);
    process.exit(1);
  }
}

seedDatabase();
