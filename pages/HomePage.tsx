
import React, { useState, useEffect, useCallback } from 'react';
import { ProductDto, ProductCreateRequest } from '../types';
import * as api from '../services/api';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
import { useAuth } from '../hooks/useAuth';
import ProductFormModal from '../components/ProductFormModal';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [searchResults, setSearchResults] = useState<ProductDto[] | null>(null);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isAuthenticated, user } = useAuth();
  const canCreate = isAuthenticated && (user?.roles.includes('ADMIN') || user?.roles.includes('USER'));

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getActiveProducts();
      setProducts(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch products.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
        setSearchResults(null);
        return;
    };
    setIsLoading(true);
    setError(null);
    try {
      const results = await api.semanticSearch(query);
      setSearchResults(results);
    } catch (err: any) {
      setError(err.message || 'Search failed.');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProduct = async (productData: ProductCreateRequest) => {
    try {
        await api.createProduct(productData);
        setIsModalOpen(false);
        fetchProducts(); // Refresh the product list
    } catch (err: any) {
        setError(err.message || 'Failed to create product.');
    }
  };
  
  const handleDeleteProduct = async (id: number) => {
    if(window.confirm('Are you sure you want to delete this product?')) {
        try {
            await api.deleteProduct(id);
            fetchProducts();
            if(searchResults){
                setSearchResults(searchResults.filter(p => p.id !== id));
            }
        } catch (err: any) {
            setError(err.message || 'Failed to delete product.');
        }
    }
  }

  const productsToDisplay = searchResults !== null ? searchResults : products;

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
          Discover Products with <span className="text-sky-400">Semantic Search</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Type anything you're looking for, from "something comfortable for the office" to "a gift for a tech lover", and let our AI find the perfect match.
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-12">
        <form onSubmit={handleSearch} className="flex items-center bg-slate-800 rounded-full shadow-lg p-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., modern chair with good back support"
            className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none px-4 py-2"
          />
          <button
            type="submit"
            className="bg-sky-600 text-white rounded-full px-6 py-2 font-semibold hover:bg-sky-700 transition-colors duration-200 disabled:bg-gray-500"
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

       <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">
          {searchResults !== null ? 'Search Results' : 'All Products'}
        </h2>
        {canCreate && (
             <button onClick={() => setIsModalOpen(true)} className="bg-green-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-700 transition-colors">
                + Add Product
            </button>
        )}
      </div>

      {error && <p className="text-center text-red-400 bg-red-900/50 p-3 rounded-md mb-4">{error}</p>}
      
      {isLoading && productsToDisplay.length === 0 ? <Spinner /> : (
        productsToDisplay.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {productsToDisplay.map((product) => (
              <ProductCard key={product.id} product={product} onDelete={handleDeleteProduct} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-gray-400">No products found.</h3>
            <p className="text-gray-500 mt-2">{searchResults !== null ? "Try a different search query." : "There are currently no products to display."}</p>
          </div>
        )
      )}
      
      {isModalOpen && (
          <ProductFormModal 
              onClose={() => setIsModalOpen(false)} 
              onSubmit={handleCreateProduct}
          />
      )}
    </div>
  );
};

export default HomePage;
