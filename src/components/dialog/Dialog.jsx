import React, { useRef } from "react";
import "./Dialog.css";
import { useOutsideAlerter } from "../../utils/customHooks";

const Dialog = ({ children, handleClose, width }) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, handleClose);

  return (
    <div className="overlay-container">
      <div className="overlay-backdrop"></div>
      <div className="global-overlay-wrapper">
        <div ref={wrapperRef} className="overlay-pane" style={{ width: width }}>
          { children }
        </div>
      </div>
    </div>
  );
};

export default Dialog;
