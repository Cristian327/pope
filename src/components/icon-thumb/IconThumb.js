import React from "react";

const { string } = require("prop-types");

const IconHand = (props) => (
  <span
    className={`card-votes__icon card-votes__${props.modifier}`}
    aria-label={`Icon ${props.description}`}
  >
    <img src={`../../assets/img/${props.url}`} alt={props.description} />
  </span>
);

IconHand.propTypes = {
  modifier: string,
  url: string,
  description: string,
};

export default IconHand;
