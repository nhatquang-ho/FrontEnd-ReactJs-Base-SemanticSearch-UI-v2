
import React, { useState } from 'react';
import { ProductCreateRequest, ProductDto } from '../types';

interface ProductFormModalProps {
  product?: ProductDto;
  onSubmit: (data: ProductCreateRequest) => void;
  onClose: () => void;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({ product, onSubmit, onClose }) => {
  const [formData, setFormData] = useState<ProductCreateRequest>({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    category: product?.category || '',
    stockQuantity: product?.stockQuantity || 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'price' || name === 'stockQuantity' ? parseFloat(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity">
      <div className="bg-slate-800 rounded-lg shadow-xl p-8 w-full max-w-lg m-4 transform transition-all">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">{product ? 'Edit Product' : 'Create New Product'}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
                <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={3} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-300">Category</label>
                    <input type="text" name="category" id="category" value={formData.category} onChange={handleChange} required className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-300">Price</label>
                    <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} required min="0" step="0.01" className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
                </div>
            </div>
             <div>
                <label htmlFor="stockQuantity" className="block text-sm font-medium text-gray-300">Stock Quantity</label>
                <input type="number" name="stockQuantity" id="stockQuantity" value={formData.stockQuantity} onChange={handleChange} required min="0" className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
            </div>
            <div className="flex justify-end space-x-4 pt-4">
                <button type="button" onClick={onClose} className="py-2 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-gray-500">
                    Cancel
                </button>
                <button type="submit" className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500">
                    {product ? 'Save Changes' : 'Create Product'}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
