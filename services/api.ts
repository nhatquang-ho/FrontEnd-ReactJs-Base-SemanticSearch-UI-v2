
import { LoginResponse, ProductDto, ProductCreateRequest, UserDto } from '../types';

const BASE_URL = 'http://localhost:8080/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

const apiFetch = async <T,>(url: string, options: RequestInit = {}): Promise<T> => {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(errorData.message || 'An API error occurred');
  }
  if (response.status === 204 || response.headers.get('content-length') === '0') {
    return null as T;
  }

  return response.json();
};

// Auth
export const login = (credentials: any) => apiFetch<LoginResponse>(`${BASE_URL}/auth/login`, { method: 'POST', body: JSON.stringify(credentials) });
export const register = (data: any) => apiFetch<UserDto>(`${BASE_URL}/auth/register`, { method: 'POST', body: JSON.stringify(data) });
export const logout = () => apiFetch<any>(`${BASE_URL}/auth/logout`, { method: 'POST' });
export const getProfile = () => apiFetch<UserDto>(`${BASE_URL}/users/profile`);

// Products
export const getActiveProducts = () => apiFetch<ProductDto[]>(`${BASE_URL}/products/active`);
export const createProduct = (product: ProductCreateRequest) => apiFetch<ProductDto>(`${BASE_URL}/products`, { method: 'POST', body: JSON.stringify(product) });
export const semanticSearch = (query: string) => apiFetch<ProductDto[]>(`${BASE_URL}/products/semantic-search`, { method: 'POST', body: JSON.stringify({ query }) });
export const deleteProduct = (id: number) => apiFetch<{ message: string }>(`${BASE_URL}/products/${id}`, { method: 'DELETE' });

// Users (Admin)
export const getAllUsers = () => apiFetch<UserDto[]>(`${BASE_URL}/users`);
export const activateUser = (id: number) => apiFetch<{ message: string }>(`${BASE_URL}/users/${id}/activate`, { method: 'PATCH' });
export const deactivateUser = (id: number) => apiFetch<{ message: string }>(`${BASE_URL}/users/${id}/deactivate`, { method: 'PATCH' });
