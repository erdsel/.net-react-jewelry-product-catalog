import axios from 'axios';

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

const API_BASE_URL = 'http://localhost:5142/api';

export const productApi = {
  getProducts: async (filters?: {
    minPrice?: number;
    maxPrice?: number;
    minPopularity?: number;
    maxPopularity?: number;
  }): Promise<Product[]> => {
    const params = new URLSearchParams();
    if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    if (filters?.minPopularity) params.append('minPopularity', filters.minPopularity.toString());
    if (filters?.maxPopularity) params.append('maxPopularity', filters.maxPopularity.toString());

    const response = await axios.get<Product[]>(`${API_BASE_URL}/products?${params.toString()}`);
    return response.data;
  },
};
