import { create } from "zustand";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} from "../api/productService";
import { Product } from "../../types/product";

interface ProductStore {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  getProductById: (id: number) => Promise<Product>;
  createProduct: (product: Omit<Product, "id">) => Promise<void>;
  updateProduct: (id: number, product: Omit<Product, "id">) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
}

const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const products = await fetchProducts();
      set({ products, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  getProductById: async (id: number) => {
    set({ loading: true });
    try {
      const product = await getProductById(id);
      set({ loading: false });
      return product;
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  createProduct: async (product) => {
    try {
      const newProduct = await createProduct(product);
      set((state) => ({ products: [...state.products, newProduct] }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  updateProduct: async (id, product) => {
    try {
      const updatedProduct = await updateProduct(id, product);
      set((state) => ({
        products: state.products.map((p) => (p.id === id ? updatedProduct : p)),
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  deleteProduct: async (id) => {
    try {
      await deleteProduct(id);
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },
}));

export default useProductStore;
