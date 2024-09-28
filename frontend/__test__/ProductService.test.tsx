import axios from "axios";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} from "../src/lib/api/productService";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("productService", () => {
  beforeAll(() => {
    process.env.NEXT_PUBLIC_API_URL = "http://localhost:8080/api";
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchProducts", () => {
    it("should fetch products successfully", async () => {
      const mockProducts = [
        { id: 1, name: "Product 1" },
        { id: 2, name: "Product 2" },
      ];
      mockedAxios.get.mockResolvedValueOnce({ data: mockProducts });

      const result = await fetchProducts();

      expect(mockedAxios.get).toHaveBeenCalledWith(
        "http://localhost:8080/api/products"
      );
      expect(result).toEqual(mockProducts);
    });

    it("should throw an error when fetch fails", async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error("Network error"));

      await expect(fetchProducts()).rejects.toThrow("Failed to fetch products");
    });
  });

  describe("createProduct", () => {
    it("should create a product successfully", async () => {
      const newProduct = { name: "New Product", price: 10 };
      const createdProduct = { id: 4, ...newProduct };
      mockedAxios.post.mockResolvedValueOnce({ data: createdProduct });

      const result = await createProduct(newProduct);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        "http://localhost:8080/api/products",
        newProduct,
        { headers: { "Content-Type": "application/json" } }
      );
      expect(result).toEqual(createdProduct);
    });

    it("should throw an error when creation fails", async () => {
      mockedAxios.post.mockRejectedValueOnce(new Error("Network error"));

      await expect(createProduct({})).rejects.toThrow(
        "Failed to create product"
      );
    });
  });

  describe("updateProduct", () => {
    it("should update a product successfully", async () => {
      const updateData = { name: "Updated Product" };
      const updatedProduct = { id: 4, ...updateData };
      mockedAxios.put.mockResolvedValueOnce({ data: updatedProduct });

      const result = await updateProduct(4, updateData);

      expect(mockedAxios.put).toHaveBeenCalledWith(
        "http://localhost:8080/api/products/4",
        updateData,
        { headers: { "Content-Type": "application/json" } }
      );
      expect(result).toEqual(updatedProduct);
    });

    it("should throw an error when update fails", async () => {
      mockedAxios.put.mockRejectedValueOnce(new Error("Network error"));

      await expect(updateProduct(4, {})).rejects.toThrow(
        "Failed to update product"
      );
    });
  });

  describe("deleteProduct", () => {
    it("should delete a product successfully", async () => {
      mockedAxios.delete.mockResolvedValueOnce({});

      const result = await deleteProduct(4);

      expect(mockedAxios.delete).toHaveBeenCalledWith(
        "http://localhost:8080/api/products/4"
      );
      expect(result).toEqual({ message: "Product deleted successfully" });
    });

    it("should throw an error when deletion fails", async () => {
      mockedAxios.delete.mockRejectedValueOnce(new Error("Network error"));

      await expect(deleteProduct(4)).rejects.toThrow(
        "Failed to delete product"
      );
    });
  });

  describe("getProductById", () => {
    it("should fetch a product by ID successfully", async () => {
      const mockProduct = { id: 4, name: "Product 4" };
      mockedAxios.get.mockResolvedValueOnce({ data: mockProduct });

      const result = await getProductById(4);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        "http://localhost:8080/api/products/4"
      );
      expect(result).toEqual(mockProduct);
    });

    it("should throw an error when fetch by ID fails", async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error("Network error"));

      await expect(getProductById(4)).rejects.toThrow(
        "Failed to fetch product by ID"
      );
    });
  });
});
