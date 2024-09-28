"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useProductStore from "../../../lib/store/productStore";
import { Product } from "../../../types/product";
import Loader from "@/components/atoms/Loader";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const { getProductById } = useProductStore();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const fetchedProduct = await getProductById(Number(id));
        setProduct(fetchedProduct);
      } catch (error) {
        throw new Error(`Failed to fetch product: ${error}`);
      }
    }
    fetchProduct();
  }, [id, getProductById]);

  if (!product) {
    return <Loader />;
  }

  return (
    <div>
      <h1 className="text-center text-4xl text-red-700 mt-6">
        Dynamic Product {product.id}
      </h1>
      <div className="flex justify-center mt-6">
        <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white mx-auto">
          <h1 className="text-2xl font-bold mb-4">Name: {product.name}</h1>
          <p className="text-gray-600 mb-2">
            Description: {product.description}
          </p>
          <p className="text-green-600 mb-2">Price: ${product.price}</p>
          <p className="text-blue-600">
            Available Stock: {product.availableStock}
          </p>
        </div>
      </div>
    </div>
  );
}
