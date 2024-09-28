import React from "react";
import ProductList from "../organisms/ProductList";
import Navbar from "../molecules/NavBar";

const ProductPage: React.FC = () => (
  <div>
    <Navbar />
    <main className="container mx-auto mt-8">
      <ProductList />
    </main>
  </div>
);

export default ProductPage;
