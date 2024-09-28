"use client";

import React, { useState, useEffect } from "react";
import useProductStore from "../../lib/store/productStore";
import { priceRanges, tableHeaders } from "@/constants";
import ProductForm from "../organisms/ProductForm";
import ProductTableRow from "../molecules/ProductTableRow";
import PriceRangeFilter from "../molecules/PriceRangeFilter";
import { Product } from "@/types/product";
import Loader from "../atoms/Loader";

const ProductList: React.FC = () => {
  const {
    products,
    loading,
    error,
    fetchProducts,
    deleteProduct,
    updateProduct,
  } = useProductStore();
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = products.filter(
    (product) =>
      product.price >= selectedPriceRange.min &&
      product.price <= selectedPriceRange.max
  );

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    fetchProducts();
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleFormSubmit = async (updatedProduct: Product) => {
    if (updatedProduct.id) {
      await updateProduct(updatedProduct.id, updatedProduct);
      fetchProducts();
      setEditingProduct(null);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <PriceRangeFilter
        selectedPriceRange={selectedPriceRange}
        setSelectedPriceRange={setSelectedPriceRange}
        priceRanges={priceRanges}
      />
      <div className="mb-4 flex justify-end">
        <ProductForm />
      </div>
      {editingProduct ? (
        <ProductForm
          product={editingProduct}
          onSave={handleFormSubmit}
          onCancel={() => setEditingProduct(null)}
        />
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              {tableHeaders.map((header) => (
                <th key={header} className="py-2 px-4 border-b">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <ProductTableRow
                key={product.id}
                product={product}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;
