import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ProductTableRow from "../src/components/molecules/ProductTableRow";

jest.mock("next/link", () => {
  return ({ children }: { children: React.ReactNode }) => {
    return children;
  };
});

describe("ProductTableRow", () => {
  const mockProduct = {
    id: 1,
    name: "Test Product",
    description: "A test product",
    price: 100,
    availableStock: 50,
  };

  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  it("calls onDelete with the correct product id when delete button is clicked", () => {
    const { getByText } = render(
      <table>
        <tbody>
          <ProductTableRow
            product={mockProduct}
            onEdit={mockOnEdit}
            onDelete={mockOnDelete}
          />
        </tbody>
      </table>
    );

    const deleteButton = getByText("Delete");
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith(mockProduct.id);
  });
});
