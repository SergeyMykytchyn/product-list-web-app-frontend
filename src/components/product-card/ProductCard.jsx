import React, { useState, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { MoreVert } from "@mui/icons-material";
import { removeProduct } from "../../store/productsReducer";
import "./ProductCard.css";
import Api from "../../api/Api";
import { useOutsideAlerter } from "../../utils/customHooks";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [toggleMoreVert, setToggleMoreVert] = useState(false);

  const toggleMoreVertRef = useRef(null);
  useOutsideAlerter(toggleMoreVertRef, () => setToggleMoreVert(false));

  const handleDelete = async () => {
    try {
      await Api.delete(`/product/${product.id}`);
      dispatch(removeProduct(product.id));
    } catch(err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <button className="product-card-link" onClick={() => history(`/product/${product.id}`) } >
        <div className="product-card">
          <div
            className="product-card-Header"
            style={{
              backgroundImage: `url('${product.imageUrl}')`
            }}
          >
            { !toggleMoreVert ? 
                <MoreVert
                  className="moreVert"
                  onClick={(event) => {
                    event.stopPropagation();
                    setToggleMoreVert(!toggleMoreVert)
                  }}
                /> : null }
            { toggleMoreVert ? <MoreVert className="moreVert" /> : null }
            {toggleMoreVert ?
              <div ref={toggleMoreVertRef} className="toggleMoreVert">
                <button
                  className="toggleMoreVertButton"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleDelete();
                    setToggleMoreVert(!toggleMoreVert);
                  }}
                >
                  Delete
                </button>
              </div> : null }
          </div>
          <div className="product-card-Content">
            <div className="product-card-ContentName">
              <span>{product.name}</span>
            </div> 
          </div>
        </div>
      </button>
    </>
  );
};

export default ProductCard;
