import React from "react";
import "./button.css";

const { string, func, bool } = require("prop-types");

const Button = ({ modifier, text, vote, disabled }) => (
  <button
    className={`card-votes__button card-votes__${modifier}`}
    disabled={disabled}
    onClick={vote}
    aria-label="Votes"
  >
    {text && text}
  </button>
);

Button.propTypes = {
  modifier: string,
  text: string,
  disabled: bool,
  vote: func,
};

export default Button;
