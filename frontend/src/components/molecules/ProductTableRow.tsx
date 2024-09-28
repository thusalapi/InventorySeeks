import React from "react";
import Link from "next/link";
import { Product } from "../../types/product";
import Button from "../atoms/Button";

interface ProductTableRowProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const ProductTableRow: React.FC<ProductTableRowProps> = ({
  product,
  onEdit,
  onDelete,
}) => (
  <tr key={product.id} className="bg-white p-4 rounded shadow">
    <td className="py-2 px-4 border-b">{product.id}</td>
    <td className="py-2 px-4 border-b">
      <Link href={`/products/${product.id}`}>
        <h3 className="font-semibold">{product.name}</h3>
      </Link>
    </td>
    <td className="py-2 px-4 border-b">{product.description}</td>
    <td className="py-2 px-4 border-b">Rs. {product.price}</td>
    <td
      className={`py-2 px-4 border-b ${
        product.availableStock < 10 ? "text-red-600" : "text-green-600"
      }`}
    >
      {product.availableStock}
    </td>
    <td className="py-2 px-4 border-b">
      <Button color="blue" className="mr-2" onClick={() => onEdit(product)}>
        Edit
      </Button>
      <Button color="red" onClick={() => onDelete(product.id)}>
        Delete
      </Button>
    </td>
  </tr>
);

export default ProductTableRow;
