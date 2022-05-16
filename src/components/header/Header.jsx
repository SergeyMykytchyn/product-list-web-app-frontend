import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { addProduct } from "../../store/productsReducer";
import "./HeaderGroups.css";
import { Add } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import Dialog from "../dialog/Dialog";
import Api from "../../api/Api";

const useOutsideAlerter = (ref, handleClose) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handleClose();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

const HeaderGroups = ({ title, displayAdd, profile }) => {
  const dispatch = useDispatch()

  const [toggleAdd, setToggleAdd] = useState(false);
  const [toggleCreate, setToggleCreate] = useState(false);
  const [isIncorrectData, setIsIncorrectData] = useState(false);
  
  const [name, setName] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [count, setCount] = useState(null);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);

  const toggleAddRef = useRef(null);
  useOutsideAlerter(toggleAddRef, () => setToggleAdd(false));


  const handleCreate = () => {
    setToggleAdd(false);
    setToggleCreate(true);
  };

  const handleCreateProductSubmit = async () => {
    try {
      setToggleCreate(false);
      await Api.post("/product", { imageUrl, name, count, width, height, weight })
        .then(response => {   
          dispatch(addProduct(response.data));
        }).catch(err => {
          setIsIncorrectData(err.response.data.message);
        }).finally(() => {
          setName(null);
          setImageUrl(null);
          setCount(null);
          setWidth(null);
          setHeight(null);
          setWeight(null);
        });
    } catch(err) {
      console.error(err.message);
    }
  };

  return (
    <>
      {isIncorrectData ? <Dialog handleClose={() => setIsIncorrectData(false)}>
        <div className="overlay-pane-title">
          <span>Error</span>
        </div>
        <div className="overlay-pane-message">
          <span>{isIncorrectData}</span>
        </div>
        <div className="overlay-pane-button-wrapper">
          <button onClick={() => setIsIncorrectData(false)} className="overlay-pane-button">Ok</button>
        </div>
      </Dialog> : null }
      {toggleCreate ? 
        <Dialog handleClose={() => setToggleCreate(false)} width="30%">
          <div className="dialog-create-title">
            <span>Create a product</span>
          </div>
          <div className="dialog-create-input">
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="dialog-create-input">
            <TextField
              fullWidth
              label="Image URL"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
            />
          </div>
          <div className="dialog-create-input">
            <TextField
              type="number"
              fullWidth
              label="Count"
              value={count}
              onChange={e => setCount(e.target.value)}
            />
          </div>
          <div className="dialog-create-input">
            <TextField
              type="number"
              fullWidth
              label="Width"
              value={width}
              onChange={e => setWidth(e.target.value)}
            />
          </div>
          <div className="dialog-create-input">
            <TextField
              type="number"
              fullWidth
              label="Height"
              value={height}
              onChange={e => setHeight(e.target.value)}
            />
          </div>
          <div className="dialog-create-input">
            <TextField
              type="number"
              fullWidth
              label="Weight"
              value={weight}
              onChange={e => setWeight(e.target.value)}
            />
          </div>
          <div className="overlay-pane-button-wrapper">
            <button className="overlay-pane-button" onClick={() => handleCreateProductSubmit()}>Create</button>
          </div>
        </Dialog>
      : null }
      <div className="header">
        <div className="headerContent">

          <div className="headerContentStart">
            <span className="headerContentStartTitle">{title}</span>
          </div>

          <div className="headerContentEnd">
            { displayAdd && !toggleAdd ? <Add className="add" onClick={() => setToggleAdd(!toggleAdd)} /> : null }
            { displayAdd && toggleAdd ? <Add className="add" /> : null }
            { toggleAdd ? 
              <div ref={toggleAddRef} className="toggleAdd">
                <button className="toggleAddButton" onClick={handleCreate}>
                  Create a product
                </button> 
              </div> 
            : null }
          </div>

        </div>
      </div>
    </>
  );
};

export default HeaderGroups;
