import React from "react";
import "./ButtonClick.css";

const ButtonClick = ({ btnText, handleClick }) => (
  <button className="ButtonClick" onClick={handleClick}>
    {btnText}
  </button>
);

export default ButtonClick;
