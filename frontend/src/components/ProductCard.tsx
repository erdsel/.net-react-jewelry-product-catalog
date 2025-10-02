import { useState } from 'react';

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

type ColorOption = 'yellow' | 'rose' | 'white';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [selectedColor, setSelectedColor] = useState<ColorOption>('yellow');

  const colorOptions: { color: ColorOption; label: string; bgClass: string }[] = [
    { color: 'yellow', label: 'Yellow Gold', bgClass: 'bg-[#E6CA97]' },
    { color: 'white', label: 'White Gold', bgClass: 'bg-[#D9D9D9]' },
    { color: 'rose', label: 'Rose Gold', bgClass: 'bg-[#E1A4A9]' },
  ];

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg key={i} className="w-4 h-4 fill-[#FDB241]" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <svg key={i} className="w-4 h-4" viewBox="0 0 24 24">
            <defs>
              <linearGradient id={`half-${i}`}>
                <stop offset="50%" stopColor="#FDB241" />
                <stop offset="50%" stopColor="#E5E7EB" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#half-${i})`}
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} className="w-4 h-4 fill-gray-300" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        );
      }
    }

    return stars;
  };

  return (
    <div className="flex flex-col items-start w-full max-w-xs mx-auto">
      {/* Product Image */}
      <div className="w-full bg-[#F5F5F5] rounded-lg overflow-hidden mb-4 aspect-square flex items-center justify-center">
        <img
          src={product.images[selectedColor]}
          alt={product.name}
          className="w-full h-full object-contain p-4"
        />
      </div>

      {/* Product Info */}
      <div className="w-full">
        <h3 className="text-sm font-avenir mb-1">{product.name}</h3>
        <p className="text-base font-avenir font-medium mb-3">${product.price.toFixed(2)} USD</p>

        {/* Color Selector */}
        <div className="flex gap-2 mb-2">
          {colorOptions.map(({ color, bgClass }) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-6 h-6 rounded-full border-2 transition-all ${
                selectedColor === color ? 'border-gray-800 scale-110' : 'border-gray-300'
              } ${bgClass}`}
              aria-label={`Select ${color} gold`}
            />
          ))}
        </div>

        {/* Color Label */}
        <p className="text-xs font-avenir text-gray-600 mb-2">
          {colorOptions.find((c) => c.color === selectedColor)?.label}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">{renderStars(product.rating)}</div>
          <span className="text-sm font-avenir text-gray-700">{product.rating.toFixed(1)}/5</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
