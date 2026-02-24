# Quick Start Guide

## Prerequisites
- Node.js (v16 or higher)
- MongoDB running locally

## Setup Steps

### 1. Clone the repository
```bash
git clone https://github.com/the-carnage/1fi.git
cd 1fi
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
echo "PORT=5001" > .env
echo "MONGODB_URI=mongodb://localhost:27017/onefi" >> .env

# Seed the database
npm run seed

# Start backend server
npm run dev
```

Backend will run on `http://localhost:5001`

### 3. Frontend Setup (in a new terminal)
```bash
cd frontend
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5001/api" > .env

# Start frontend server
npm run dev
```

Frontend will run on `http://localhost:5173` (or next available port)

### 4. Open in Browser
Visit `http://localhost:5173` (or the port shown in terminal)

## Verify Everything Works

### Test Backend API
```bash
curl http://localhost:5001/api/products
```

You should see JSON data with 3 products.

### Test Frontend
1. Home page should show 3 product cards
2. Click any product to view details
3. Select different color variants
4. Choose an EMI plan
5. Click "Proceed" button

## Troubleshooting

### Port 5000 already in use (macOS)
macOS uses port 5000 for AirPlay Receiver. That's why we use port 5001.

### MongoDB connection error
Make sure MongoDB is running:
```bash
# Check if MongoDB is running
pgrep mongod

# If not running, start it
mongod --config /usr/local/etc/mongod.conf
```

### Frontend can't connect to backend
1. Check backend is running on port 5001
2. Verify `.env` file in frontend has correct API URL
3. Restart frontend dev server after changing .env

### Database is empty
Run the seed script:
```bash
cd backend
npm run seed
```

## Features to Test

- [x] Product listing page
- [x] Product detail page with unique URLs
- [x] Color variant selection
- [x] Storage variant selection
- [x] EMI plan selection
- [x] Image gallery with thumbnails
- [x] Responsive design (resize browser)
- [x] Price calculations and discounts
- [x] Cashback information display

## Tech Stack
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Frontend:** React, Vite, Tailwind CSS, Material-UI
- **Database:** MongoDB with 3 products, multiple variants, and EMI plans
