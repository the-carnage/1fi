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
PORT=5001
MONGODB_URI=mongodb://localhost:27017/onefi
```

**Note:** Port 5001 is used instead of 5000 because macOS uses port 5000 for AirPlay Receiver/Control Center.

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

Server will run on `http://localhost:5001`

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

## Frontend Setup

### Prerequisites
- Node.js (v16 or higher)

### Installation

```bash
cd frontend
npm install
```

### Environment Variables

Create a `.env` file in the frontend directory:

```
VITE_API_URL=http://localhost:5001/api
```

### Run Frontend Development Server

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Features

### Backend Features
- RESTful API with Express.js
- MongoDB database with Mongoose ODM
- Product and variant management
- EMI plan calculations
- CORS enabled for frontend integration

### Frontend Features
- Responsive design with Tailwind CSS and Material-UI
- Product listing page with cards
- Dynamic product detail pages with unique URLs
- Variant selection (color swatches)
- EMI plan selection with radio buttons
- Image gallery with thumbnails
- Real-time price and discount calculations
- Loading states and error handling

## Project Structure

```
1fi/
├── backend/
│   ├── models/
│   │   └── Product.js
│   ├── routes/
│   │   └── products.js
│   ├── .env
│   ├── server.js
│   ├── seed.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── EmiPlanCard.jsx
│   │   │   └── VariantSelector.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── ProductDetail.jsx
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   └── package.json
└── README.md
```

## Running the Full Application

1. Start MongoDB (if running locally):
```bash
mongod
```

2. Seed the database:
```bash
cd backend
npm run seed
```

3. Start the backend server:
```bash
cd backend
npm run dev
```

4. In a new terminal, start the frontend:
```bash
cd frontend
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Testing the Application

### Backend API Testing

Test the backend APIs using curl or your browser:

```bash
# Get all products
curl http://localhost:5001/api/products

# Get specific product
curl http://localhost:5001/api/products/iphone-17-pro
curl http://localhost:5001/api/products/samsung-s24-ultra
curl http://localhost:5001/api/products/oneplus-13
```

### Frontend Testing

1. Visit the home page at `http://localhost:5173` to see all products
2. Click on any product card to view full details
3. Select different color variants to see images change
4. Switch between storage options (if available)
5. Choose an EMI plan from the available options
6. Click "Proceed" to simulate checkout
7. Test responsive design by resizing browser window

### Verification Checklist

- [ ] Backend server starts without errors
- [ ] Database seeds successfully with 3 products
- [ ] API endpoints return proper JSON responses
- [ ] Frontend loads product listing page
- [ ] Product cards display images, prices, and discounts
- [ ] Product detail page loads with correct data
- [ ] Variant selection updates images and pricing
- [ ] EMI plan selection works with radio buttons
- [ ] Responsive design works on mobile viewport
- [ ] Navigation and routing work correctly

## Technologies Used

- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Frontend:** React 18, Vite, React Router, Axios
- **UI:** Tailwind CSS, Material-UI (MUI)
- **Development:** Nodemon, ESLint
