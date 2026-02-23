# 1Fi - Product EMI Plans Full-Stack Application

A full-stack web application that displays smartphone products with selectable EMI plans backed by mutual funds.

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS enabled

### Frontend
- React with Vite
- Tailwind CSS
- Material-UI (MUI)
- React Router
- Axios

## Backend Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)

### Installation

```bash
cd backend
npm install
```

### Environment Variables

Create a `.env` file in the backend directory:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/onefi
```

### Database Schema

#### Product Schema
```javascript
{
  name: String,
  slug: String (unique),
  brand: String,
  category: String,
  description: String,
  variants: [{
    variantName: String,
    storage: String,
    color: String,
    colorHex: String,
    mrp: Number,
    price: Number,
    images: [String]
  }],
  emiPlans: [{
    tenure: Number,
    monthlyAmount: Number,
    interestRate: Number,
    cashback: Boolean,
    cashbackAmount: Number
  }],
  timestamps: true
}
```

### Seed Database

```bash
npm run seed
```

### Run Backend Server

```bash
npm run dev
```

Server will run on `http://localhost:5000`

## API Endpoints

### GET /api/products
Get all products (summary view)

**Response:**
```json
[
  {
    "_id": "...",
    "name": "Apple iPhone 17 Pro",
    "slug": "iphone-17-pro",
    "brand": "Apple",
    "category": "Smartphones",
    "variants": [
      {
        "images": ["url1", "url2"],
        "price": 134900,
        "mrp": 144900
      }
    ]
  }
]
```

### GET /api/products/:slug
Get single product with full details

**Example:** `/api/products/iphone-17-pro`

**Response:**
```json
{
  "_id": "...",
  "name": "Apple iPhone 17 Pro",
  "slug": "iphone-17-pro",
  "brand": "Apple",
  "category": "Smartphones",
  "description": "...",
  "variants": [
    {
      "variantName": "Silver 256GB",
      "storage": "256GB",
      "color": "Silver",
      "colorHex": "#E3E4E5",
      "mrp": 144900,
      "price": 134900,
      "images": ["url1", "url2"]
    }
  ],
  "emiPlans": [
    {
      "tenure": 3,
      "monthlyAmount": 44967,
      "interestRate": 0,
      "cashback": true,
      "cashbackAmount": 2000
    }
  ]
}
```

## Products Available

1. **Apple iPhone 17 Pro** - 3 color variants (Silver, Desert Gold, Space Black)
2. **Samsung Galaxy S24 Ultra** - 2 variants (Titanium Gray 256GB, Titanium Violet 512GB)
3. **OnePlus 13** - 2 color variants (Midnight Ocean, Arctic Dawn)
