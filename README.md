# Product Listing Full-Stack Application

A full-stack product listing application with .NET 8 backend and React TypeScript frontend.

## Features

- **Backend (.NET 8 Web API)**
  - RESTful API serving product data
  - Real-time gold price integration (GoldAPI.io)
  - Dynamic price calculation: `(popularityScore + 1) × weight × goldPrice`
  - Filtering by price range and popularity score
  - CORS enabled for frontend integration

- **Frontend (React + TypeScript)**
  - Responsive product carousel with Swiper.js
  - Color picker for product variants (Yellow/Rose/White Gold)
  - Star rating system (popularity score converted to 5-star scale)
  - Tailwind CSS for styling
  - Mobile-friendly swipe support

## Prerequisites

- .NET 8 SDK
- Node.js (v20+)
- npm or yarn

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Restore dependencies:
   ```bash
   dotnet restore
   ```

3. Run the API:
   ```bash
   dotnet run
   ```

   The API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

## API Endpoints

### Get All Products
```
GET /api/products
```

### Get Filtered Products
```
GET /api/products?minPrice=100&maxPrice=500&minPopularity=0.5&maxPopularity=1.0
```

**Query Parameters:**
- `minPrice` (optional): Minimum price filter
- `maxPrice` (optional): Maximum price filter
- `minPopularity` (optional): Minimum popularity score (0-1)
- `maxPopularity` (optional): Maximum popularity score (0-1)

## Project Structure

```
full-stack-project/
├── backend/
│   ├── Controllers/
│   │   └── ProductsController.cs
│   ├── Models/
│   │   ├── Product.cs
│   │   └── GoldPriceResponse.cs
│   ├── Services/
│   │   ├── IGoldPriceService.cs
│   │   ├── GoldPriceService.cs
│   │   ├── IProductService.cs
│   │   └── ProductService.cs
│   ├── Data/
│   │   └── products.json
│   └── Program.cs
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ProductCard.tsx
    │   │   └── ProductCarousel.tsx
    │   ├── services/
    │   │   └── api.ts
    │   ├── types/
    │   │   └── Product.ts
    │   ├── App.tsx
    │   └── index.css
    └── package.json
```

## Technologies Used

### Backend
- .NET 8
- ASP.NET Core Web API
- GoldAPI.io for real-time gold prices

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Swiper.js
- Axios

## Configuration

### Gold API Key
The backend uses GoldAPI.io for real-time gold prices. The API key is configured in `backend/appsettings.json`:

```json
{
  "GoldAPI": {
    "ApiKey": "your-api-key-here"
  }
}
```

## Deployment

### Backend
- Recommended: Railway, Render, or Azure App Service
- Ensure environment variables are set for production

### Frontend
- Recommended: Vercel, Netlify, or GitHub Pages
- Update API base URL in `frontend/src/services/api.ts` for production

## License

MIT
