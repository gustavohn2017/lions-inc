// components/ProductCard.tsx
import React from 'react';

interface ProductCardProps {
  title: string;
  description: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, description }) => {
  return (
    <div className="group relative rounded-lg border border-gray-200 p-6 transition-transform transform-gpu hover:scale-105 hover:shadow-lg">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <div className="absolute inset-0 rounded-lg border border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );
};

export default ProductCard;