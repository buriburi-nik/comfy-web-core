import { Product } from '@/data/mockProducts';

export type SortOption = 'price-low' | 'price-high' | 'newest' | 'name';

export interface FilterOptions {
  search: string;
  category: string;
  vendor: string;
  priceMin: number;
  priceMax: number;
  inStock: boolean;
  status?: string;
}

export const defaultFilters: FilterOptions = {
  search: '',
  category: '',
  vendor: '',
  priceMin: 0,
  priceMax: 1000,
  inStock: false,
  status: '',
};

export const filterProducts = (products: Product[], filters: FilterOptions): Product[] => {
  return products.filter((product) => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchLower));
      if (!matchesSearch) return false;
    }

    // Category filter
    if (filters.category && product.category !== filters.category) {
      return false;
    }

    // Vendor filter
    if (filters.vendor && product.vendorId !== filters.vendor) {
      return false;
    }

    // Price filter
    if (product.price < filters.priceMin || product.price > filters.priceMax) {
      return false;
    }

    // Stock filter
    if (filters.inStock && product.stock <= 0) {
      return false;
    }

    // Status filter
    if (filters.status && product.status !== filters.status) {
      return false;
    }

    return true;
  });
};

export const sortProducts = (products: Product[], sortBy: SortOption): Product[] => {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted;
  }
};

export const paginateProducts = (
  products: Product[],
  page: number,
  pageSize: number
): { products: Product[]; totalPages: number; totalItems: number } => {
  const startIndex = (page - 1) * pageSize;
  const paginatedProducts = products.slice(startIndex, startIndex + pageSize);
  
  return {
    products: paginatedProducts,
    totalPages: Math.ceil(products.length / pageSize),
    totalItems: products.length,
  };
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const getStatusColor = (status: Product['status']): string => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'inactive':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case 'rejected':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    case 'flagged':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Simulate API delay
export const simulateApiCall = <T>(data: T, delay: number = 500): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};
