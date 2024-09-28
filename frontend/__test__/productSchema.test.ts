import { productSchema } from "../src/constants/productSchema";

describe("productSchema", () => {
  it("should validate a valid product", () => {
    const validProduct = {
      name: "Product 1",
      description: "Description 1",
      price: 10.5,
      availableStock: 100,
    };

    const result = productSchema.safeParse(validProduct);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(validProduct);
  });

  it("should error when name is less than 3 characters", () => {
    const invalidProduct = {
      name: "Ab",
      description: "Description 1",
      price: 10.5,
      availableStock: 100,
    };

    const result = productSchema.safeParse(invalidProduct);
    expect(result.success).toBe(false);
    expect(result.error?.issues).toContainEqual(
      expect.objectContaining({
        code: "too_small",
        path: ["name"],
        message: "Name is required",
      })
    );
  });

  it("should error when description is empty", () => {
    const invalidProduct = {
      name: "Product 1",
      description: "",
      price: 10.5,
      availableStock: 100,
    };

    const result = productSchema.safeParse(invalidProduct);
    expect(result.success).toBe(false);
    expect(result.error?.issues).toContainEqual(
      expect.objectContaining({
        code: "too_small",
        path: ["description"],
        message: "Description is required",
      })
    );
  });

  it("should error when price is less than 0.01", () => {
    const invalidProduct = {
      name: "Product 1",
      description: "Description 1",
      price: -0.01,
      availableStock: 100,
    };

    const result = productSchema.safeParse(invalidProduct);
    expect(result.success).toBe(false);
    expect(result.error?.issues).toContainEqual(
      expect.objectContaining({
        code: "too_small",
        path: ["price"],
        message: "Price must be at least 0.01",
      })
    );
  });

  it("should error when available stock is less than 0", () => {
    const invalidProduct = {
      name: "Product 1",
      description: "Description 1",
      price: 10.5,
      availableStock: -10,
    };

    const result = productSchema.safeParse(invalidProduct);
    expect(result.success).toBe(false);
    expect(result.error?.issues).toContainEqual(
      expect.objectContaining({
        code: "too_small",
        path: ["availableStock"],
        message: "Available stock must be at least 0",
      })
    );
  });
});
