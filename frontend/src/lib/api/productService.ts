import axios from "axios";

const getApiUrl = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not set");
  }
  return apiUrl;
};

export async function fetchProducts() {
  try {
    const response = await axios.get(`${getApiUrl()}/products`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
}

export async function createProduct(product: any) {
  try {
    const response = await axios.post(`${getApiUrl()}/products`, product, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to create product");
  }
}

export async function updateProduct(id: number, updateData: any) {
  try {
    const response = await axios.put(
      `${getApiUrl()}/products/${id}`,
      updateData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update product");
  }
}

export async function deleteProduct(id: number) {
  try {
    await axios.delete(`${getApiUrl()}/products/${id}`);
    return { message: "Product deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete product");
  }
}

export async function getProductById(id: number) {
  try {
    const response = await axios.get(`${getApiUrl()}/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch product by ID");
  }
}
