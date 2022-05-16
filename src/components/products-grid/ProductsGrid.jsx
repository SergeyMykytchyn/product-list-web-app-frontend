import React from "react";
import { useSelector } from 'react-redux';
import "./ProductsGrid.css";
import ProductCard from "../product-card/ProductCard";

const GroupsGrid = () => {
  const products = useSelector((state) => state.products.products);

  return (
    <div className="groups-grid-container">
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />
      })}
    </div>
  );
};

export default GroupsGrid;