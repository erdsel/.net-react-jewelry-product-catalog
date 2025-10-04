# gold jewelry product catalog

a full-stack web application showcasing gold jewelry products with real-time pricing based on current gold market rates. built with .net 8 backend and react + typescript frontend, deployed on render and vercel.

## live demo

- **frontend**: https://net-react-jewelry-product-catalog.vercel.app
- **backend api**: https://gold-jewelry-api.onrender.com/api/products

## screenshots from project
![ss\homepage.jpg]
![ss\homepage2.jpg]
![ss\changecolors.jpg]
![ss\filter.jpg]
## features

### core functionality
- real-time gold price integration with multiple api fallbacks
- dynamic price calculation: `(popularity_score + 1) × weight × gold_price_per_gram`
- interactive product carousel with swipe support (mobile & desktop)
- color variant selector (yellow gold, rose gold, white gold)
- star rating system (popularity score converted to 5-star scale)
- price and popularity filtering
- responsive design for all screen sizes

### technical highlights
- restful api architecture
- service-based backend design pattern
- typescript for type-safe frontend development
- optimized docker deployment
- cors configuration for cross-origin requests
- environment-based configuration

## technology stack

### backend
- **framework**: .net 8 / asp.net core web api
- **language**: c# 12
- **architecture**: service layer pattern with dependency injection
- **apis**: goldapi.io, metalpriceapi.com, goldprice.org (fallback chain)
- **deployment**: render (docker container)

### frontend
- **framework**: react 18
- **language**: typescript
- **build tool**: vite
- **styling**: tailwind css
- **ui library**: swiper.js (carousel)
- **http client**: axios
- **deployment**: vercel

## project structure

```
full-stack-project/
├── backend/
│   ├── Controllers/
│   │   └── ProductsController.cs      # api endpoints
│   ├── Models/
│   │   ├── Product.cs                 # product model
│   │   └── GoldPriceResponse.cs       # api response models
│   ├── Services/
│   │   ├── IGoldPriceService.cs       # gold price service interface
│   │   ├── GoldPriceService.cs        # gold price api integration
│   │   ├── IProductService.cs         # product service interface
│   │   └── ProductService.cs          # product business logic
│   ├── Data/
│   │   └── products.json              # product seed data
│   ├── Program.cs                     # app configuration & startup
│   ├── Dockerfile                     # docker configuration
│   └── ProductAPI.csproj              # project dependencies
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProductCard.tsx        # individual product card
│   │   │   ├── ProductCarousel.tsx    # swiper carousel wrapper
│   │   │   └── FilterPanel.tsx        # price/popularity filters
│   │   ├── services/
│   │   │   └── api.ts                 # axios api client
│   │   ├── types/
│   │   │   └── Product.ts             # typescript interfaces
│   │   ├── App.tsx                    # main app component
│   │   ├── main.tsx                   # react entry point
│   │   └── App.css                    # global styles
│   ├── public/                        # static assets
│   ├── index.html                     # html template
│   ├── tailwind.config.js             # tailwind configuration
│   ├── vite.config.ts                 # vite configuration
│   ├── vercel.json                    # vercel deployment config
│   └── package.json                   # dependencies
│
├── render.yaml                        # render deployment blueprint
└── products.json                      # original product data
```

## local development setupa

### prerequisites
- .net 8 sdk
- node.js 20+
- npm or yarn

### backend setup

1. navigate to backend directory:
```bash
cd backend
```

2. restore dependencies:
```bash
dotnet restore
```

3. (optional) configure gold api key in `appsettings.json`:
```json
{
  "GoldAPI": {
    "ApiKey": "your-api-key-here"
  }
}
```

4. run the api:
```bash
dotnet run
```

the api will be available at `http://localhost:5142`

### frontend setup

1. navigate to frontend directory:
```bash
cd frontend
```

2. install dependencies:
```bash
npm install
```

3. create `.env.development` file:
```
VITE_API_URL=http://localhost:5142/api
```

4. run the development server:
```bash
npm run dev
```

the app will be available at `http://localhost:5173`

## api documentation

### endpoints

#### get all products
```
GET /api/products
```

**response example:**
```json
[
  {
    "name": "engagement ring 1",
    "popularityScore": 0.85,
    "weight": 2.1,
    "images": {
      "yellow": "https://cdn.shopify.com/...",
      "rose": "https://cdn.shopify.com/...",
      "white": "https://cdn.shopify.com/..."
    },
    "price": 485.48,
    "rating": 4.2
  }
]
```

#### get filtered products
```
GET /api/products?minPrice=100&maxPrice=500&minPopularity=0.5&maxPopularity=1.0
```

**query parameters:**
- `minPrice` (number, optional): minimum price in usd
- `maxPrice` (number, optional): maximum price in usd
- `minPopularity` (number, optional): minimum popularity score (0-1)
- `maxPopularity` (number, optional): maximum popularity score (0-1)

### price calculation logic

```
price = (popularity_score + 1) × weight_in_grams × current_gold_price_per_gram
```

- **popularity_score**: 0-1 scale representing product popularity
- **weight**: product weight in grams
- **gold_price**: fetched from real-time apis with fallback chain

### gold price service

the backend attempts multiple apis in order:
1. goldapi.io (requires api key)
2. metalpriceapi.com
3. goldprice.org
4. fallback to $75/gram if all apis fail


### backend architecture

- **dependency injection**: services registered in `Program.cs`
- **httpclient factory**: proper http client lifecycle management
- **cors policy**: configurable allowed origins via environment variables
- **error handling**: graceful fallback for external api failures
- **logging**: structured logging with different log levels

### frontend features

- **swiper integration**: touch-enabled carousel with navigation
- **color state management**: per-product color selection
- **responsive images**: shopify cdn-hosted product images
- **filter state**: react hooks for filter management
- **error boundaries**: user-friendly error messages
- **loading states**: skeleton screens during data fetch

