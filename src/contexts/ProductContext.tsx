import React, { createContext, useContext, useState, useCallback } from 'react';
import { Product, mockProducts, vendors, Vendor } from '@/data/mockProducts';
import { simulateApiCall } from '@/utils/productUtils';
import { toast } from 'sonner';

export type UserRole = 'public' | 'vendor' | 'admin';

interface ProductContextType {
  products: Product[];
  vendors: Vendor[];
  currentVendorId: string;
  role: UserRole;
  loading: boolean;
  setRole: (role: UserRole) => void;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  bulkDeleteProducts: (ids: string[]) => Promise<void>;
  bulkUpdateStatus: (ids: string[], status: Product['status']) => Promise<void>;
  bulkUpdateCategory: (ids: string[], category: string) => Promise<void>;
  approveProduct: (id: string) => Promise<void>;
  rejectProduct: (id: string) => Promise<void>;
  flagProduct: (id: string) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [role, setRole] = useState<UserRole>('public');
  const [loading, setLoading] = useState(false);
  const currentVendorId = 'v1'; // Simulated current vendor

  const addProduct = useCallback(async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true);
    try {
      await simulateApiCall(null, 800);
      const newProduct: Product = {
        ...productData,
        id: `p${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setProducts((prev) => [newProduct, ...prev]);
      toast.success('Product added successfully');
    } catch (error) {
      toast.error('Failed to add product');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProduct = useCallback(async (id: string, updates: Partial<Product>) => {
    setLoading(true);
    try {
      await simulateApiCall(null, 500);
      setProducts((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
        )
      );
      toast.success('Product updated successfully');
    } catch (error) {
      toast.error('Failed to update product');
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteProduct = useCallback(async (id: string) => {
    setLoading(true);
    try {
      await simulateApiCall(null, 500);
      setProducts((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, status: 'inactive' as const, updatedAt: new Date().toISOString() } : p
        )
      );
      toast.success('Product deactivated');
    } catch (error) {
      toast.error('Failed to delete product');
    } finally {
      setLoading(false);
    }
  }, []);

  const bulkDeleteProducts = useCallback(async (ids: string[]) => {
    setLoading(true);
    try {
      await simulateApiCall(null, 800);
      setProducts((prev) =>
        prev.map((p) =>
          ids.includes(p.id) ? { ...p, status: 'inactive' as const, updatedAt: new Date().toISOString() } : p
        )
      );
      toast.success(`${ids.length} products deactivated`);
    } catch (error) {
      toast.error('Failed to delete products');
    } finally {
      setLoading(false);
    }
  }, []);

  const bulkUpdateStatus = useCallback(async (ids: string[], status: Product['status']) => {
    setLoading(true);
    try {
      await simulateApiCall(null, 600);
      setProducts((prev) =>
        prev.map((p) =>
          ids.includes(p.id) ? { ...p, status, updatedAt: new Date().toISOString() } : p
        )
      );
      toast.success(`${ids.length} products updated to ${status}`);
    } catch (error) {
      toast.error('Failed to update products');
    } finally {
      setLoading(false);
    }
  }, []);

  const bulkUpdateCategory = useCallback(async (ids: string[], category: string) => {
    setLoading(true);
    try {
      await simulateApiCall(null, 600);
      setProducts((prev) =>
        prev.map((p) =>
          ids.includes(p.id) ? { ...p, category, updatedAt: new Date().toISOString() } : p
        )
      );
      toast.success(`${ids.length} products moved to ${category}`);
    } catch (error) {
      toast.error('Failed to update products');
    } finally {
      setLoading(false);
    }
  }, []);

  const approveProduct = useCallback(async (id: string) => {
    await updateProduct(id, { status: 'active' });
    toast.success('Product approved');
  }, [updateProduct]);

  const rejectProduct = useCallback(async (id: string) => {
    await updateProduct(id, { status: 'rejected' });
    toast.success('Product rejected');
  }, [updateProduct]);

  const flagProduct = useCallback(async (id: string) => {
    await updateProduct(id, { status: 'flagged' });
    toast.success('Product flagged for review');
  }, [updateProduct]);

  return (
    <ProductContext.Provider
      value={{
        products,
        vendors,
        currentVendorId,
        role,
        loading,
        setRole,
        addProduct,
        updateProduct,
        deleteProduct,
        bulkDeleteProducts,
        bulkUpdateStatus,
        bulkUpdateCategory,
        approveProduct,
        rejectProduct,
        flagProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
