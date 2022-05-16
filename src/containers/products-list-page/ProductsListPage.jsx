import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setProducts } from "../../store/productsReducer";
import Header from "../../components/header/Header";
// import ProductsGrid from "../../components/products-grid/ProductsGrid";
import Api from "../../api/Api";

const ProductsListPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get("/product");
        dispatch(setProducts(response.data));
      } catch(err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <Header displayAdd={true} profile={false} title="Products list" />
      {/* <ProductsGrid /> */}
    </>
  );
};

export default ProductsListPage;
