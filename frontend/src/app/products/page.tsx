import ProductList from "../../components/organisms/ProductList";

export default function ProductsPage() {
  return (
    <>
      <div className="w-3/4 mx-auto">
        <h1 className="text-3xl font-bold mb-8">All Products</h1>
        <ProductList />
      </div>
    </>
  );
}
