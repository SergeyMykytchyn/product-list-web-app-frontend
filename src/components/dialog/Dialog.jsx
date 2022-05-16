import React, { useRef, useEffect } from "react";
import "./Dialog.css";

const useOutsideAlerter = (ref, handleClose) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        // alert("You clicked outside of me!");
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
