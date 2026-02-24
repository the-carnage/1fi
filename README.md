# 1Fi — Product Catalogue with EMI Plans

A full-stack e-commerce product catalogue for smartphones with variant selection and EMI plan breakdowns. Built with React, Node.js, Express, and MongoDB.

🔗 **Live Demo:** https://1fi-flame.vercel.app

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, Material UI (MUI), React Router, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose ODM |
| Deployment | Vercel (frontend), MongoDB Atlas (database) |

---

## Project Structure

```
1fi/
├── backend/
│   ├── models/
│   │   └── Product.js        # Mongoose schema
│   ├── routes/
│   │   └── products.js       # REST route handlers
│   ├── server.js             # Express app entry point
│   ├── seed.js               # Database seed script
│   ├── .env                  # Backend env vars (not committed)
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/       # Navbar, ProductCard, EmiPlanCard, etc.
│   │   ├── pages/            # Home, ProductDetail, NotFound
│   │   ├── api.js            # Axios instance + API calls
│   │   └── App.jsx
│   ├── .env                  # Frontend env vars (not committed)
│   └── package.json
└── README.md
```

---

## Setup & Run Instructions

### Prerequisites

- Node.js v18+
- MongoDB (local) or a MongoDB Atlas connection string

---

### 1. Clone the repo

```bash
git clone https://github.com/the-carnage/1fi.git
cd 1fi
```

---

### 2. Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/onefi
# For Atlas: MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/onefi
```

Seed the database:

```bash
npm run seed
```

Start the server:

```bash
npm start          # production
npm run dev        # development (nodemon)
```

Backend runs on **http://localhost:5001**

---

### 3. Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5001
```

Start the dev server:

```bash
npm run dev
```

Frontend runs on **http://localhost:5173**

---

### 4. Build for Production

```bash
cd frontend
npm run build
```

---

## API Endpoints

### `GET /products`

Returns all products (summary — name, brand, slug, variants with price/images only).

**Example request:**
```bash
curl http://localhost:5001/products
```

**Example response:**
```json
[
  {
    "_id": "699df33128df8e00df837074",
    "name": "Samsung Galaxy S24 Ultra",
    "slug": "samsung-galaxy-s24-ultra",
    "brand": "Samsung",
    "category": "Smartphones",
    "variants": [
      {
        "mrp": 144999,
        "price": 119999,
        "images": [
          "https://media-ik.croma.com/.../303838_oqpio4.png",
          "https://media-ik.croma.com/.../303838_1_l9ya6v.png"
        ]
      }
    ]
  }
]
```

---

### `GET /products/:slug`

Returns a single product with full details including all variants and EMI plans.

**Example request:**
```bash
curl http://localhost:5001/products/samsung-galaxy-s24-ultra
```

**Example response:**
```json
{
  "_id": "699df33128df8e00df837074",
  "name": "Samsung Galaxy S24 Ultra",
  "slug": "samsung-galaxy-s24-ultra",
  "brand": "Samsung",
  "category": "Smartphones",
  "description": "Galaxy AI powered flagship with premium titanium frame.",
  "createdAt": "2026-02-24T18:51:29.796Z",
  "updatedAt": "2026-02-24T18:51:29.796Z",
  "variants": [
    {
      "_id": "699df33128df8e00df837075",
      "variantName": "Titanium Gray 256GB",
      "storage": "256GB",
      "color": "Gray",
      "colorHex": "#5F6368",
      "mrp": 144999,
      "price": 119999,
      "images": [
        "https://media-ik.croma.com/.../303838_oqpio4.png"
      ]
    }
  ],
  "emiPlans": [
    {
      "_id": "699df33128df8e00df837077",
      "tenure": 3,
      "monthlyAmount": 40000,
      "interestRate": 0,
      "cashback": true,
      "cashbackAmount": 2000
    }
  ]
}
```

---

## Database Schema

### Variant Sub-document

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `variantName` | String | ✅ | e.g. "Titanium Gray 256GB" |
| `storage` | String | ✅ | e.g. "256GB" |
| `color` | String | ✅ | e.g. "Gray" |
| `colorHex` | String | ✅ | Hex code for color swatch |
| `mrp` | Number | ✅ | Original price (₹) |
| `price` | Number | ✅ | Selling price (₹) |
| `images` | [String] | — | Array of image URLs |

### EMI Plan Sub-document

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `tenure` | Number | ✅ | Months (e.g. 3, 6, 12) |
| `monthlyAmount` | Number | ✅ | Monthly instalment (₹) |
| `interestRate` | Number | ✅ | Interest % (0 = no-cost EMI) |
| `cashback` | Boolean | — | Cashback available |
| `cashbackAmount` | Number | — | Cashback value (₹) |

### Product Document

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | String | ✅ | Product name |
| `slug` | String | ✅ (unique) | URL-friendly identifier |
| `brand` | String | ✅ | Brand name |
| `category` | String | ✅ | e.g. "Smartphones" |
| `description` | String | — | Product description |
| `variants` | [Variant] | — | Array of variants |
| `emiPlans` | [EmiPlan] | — | Array of EMI options |
| `createdAt` | Date | auto | Mongoose timestamp |
| `updatedAt` | Date | auto | Mongoose timestamp |

---

## Seed Data

The database is seeded with **9 real smartphone products**:

| # | Product | Brand | Variants |
|---|---------|-------|---------|
| 1 | Samsung Galaxy S24 Ultra | Samsung | 2 |
| 2 | OnePlus 12 | OnePlus | 2 |
| 3 | iQOO Neo 9 Pro | iQOO | 2 |
| 4 | Xiaomi 14 | Xiaomi | 2 |
| 5 | Realme GT 6 | Realme | 2 |
| 6 | Google Pixel 8 | Google | 2 |
| 7 | Apple iPhone 15 Plus | Apple | 2 |
| 8 | Samsung Galaxy S23 Ultra | Samsung | 2 |
| 9 | Apple iPhone 15 | Apple | 2 |

Run `npm run seed` from the `backend/` directory to populate the database.

---

## Frontend Features

- Responsive product grid (1 / 2 / 3 / 4 columns)
- Live search by name or brand
- Filter by category, sort by price or name
- Product detail page with image gallery
- Storage and color variant selector
- EMI plan cards with monthly breakdown
- Discount badge (% OFF) auto-calculated from MRP vs price


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
