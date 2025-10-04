import { useEffect, useState } from 'react';
import ProductCarousel from './components/ProductCarousel';
import FilterPanel from './components/FilterPanel';
import { productApi } from './services/api';
import './App.css';

interface Product {
  name: string;
  popularityScore: number;
  weight: number;
  images: {
    yellow: string;
    rose: string;
    white: string;
  };
  price: number;
  rating: number;
}

interface Filters {
  minPrice?: number;
  maxPrice?: number;
  minPopularity?: number;
  maxPopularity?: number;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productApi.getProducts(filters);
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please make sure the backend API is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-avenir">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-avenir text-red-600 mb-2">{error}</div>
          <div className="text-sm text-gray-600">
            Make sure the backend is running on http://localhost:5142
          </div>
        </div>
      </div>
    );
  }

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Gold Jewelry Collection</h1>
        <FilterPanel onFilterChange={handleFilterChange} />
        <ProductCarousel products={products} />
      </div>
    </div>
  );
}

export default App;
