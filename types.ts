
export type Page = 'home' | 'login' | 'register' | 'profile' | 'admin';

export type Role = 'ADMIN' | 'USER';

export interface UserDto {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roles: Role[];
  isActive: boolean;
  createdAt: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  userId: number;
  username: string;
  email: string;
  roles: Role[];
}

export interface ProductDto {
  id: number;
  name: string;
  description?: string;
  price: number;
  category: string;
  stockQuantity: number;
  isActive: boolean;
  createdAt: string;
}

export interface ProductCreateRequest {
  name: string;
  description?: string;
  price: number;
  category: string;
  stockQuantity: number;
}
