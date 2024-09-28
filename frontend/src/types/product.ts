export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  availableStock: number;
  [key: string]: any;
}

export interface ProductStore {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => void;
}

export interface ProductListProps {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export interface ProductFormProps {
  product?: Product;
  onSave?: (product: Product) => void;
  onCancel?: () => void;
}
