import React from 'react';
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import ProductsListPage from "./containers/products-list-page/ProductsListPage";
import ProductPage from "./containers/product-page/ProductPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<ProductsListPage />} />
        <Route exact path="/product/:productId" element={<ProductPage />} />
        <Route path="*" element={<Navigate to ="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
