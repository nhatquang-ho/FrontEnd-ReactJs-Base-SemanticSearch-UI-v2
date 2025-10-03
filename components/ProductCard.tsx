
import React from 'react';
import { ProductDto } from '../types';
import { useAuth } from '../hooks/useAuth';

interface ProductCardProps {
  product: ProductDto;
  onDelete?: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete }) => {
    const { isAuthenticated, user } = useAuth();
    const canManage = isAuthenticated && (user?.roles.includes('ADMIN') || false); // Add owner logic if available

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-sky-500/20 group">
      <div className="relative">
        <img 
          className="w-full h-56 object-cover" 
          src={`https://picsum.photos/seed/${product.id}/600/400`} 
          alt={product.name} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-xl font-bold text-white">{product.name}</h3>
          <span className="text-xs font-semibold uppercase tracking-wider text-sky-400 bg-sky-900/50 px-2 py-1 rounded">
            {product.category}
          </span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-400 text-sm mb-4 h-10 overflow-hidden">{product.description || 'No description available.'}</p>
        <div className="flex justify-between items-center">
          <p className="text-2xl font-light text-sky-300">${product.price.toFixed(2)}</p>
          <p className={`text-sm font-medium ${product.stockQuantity > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Out of stock'}
          </p>
        </div>
        {canManage && onDelete && (
            <div className="mt-4 pt-4 border-t border-slate-700 flex justify-end">
                <button onClick={() => onDelete(product.id)} className="text-xs bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded transition-colors duration-200">
                    Delete
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
