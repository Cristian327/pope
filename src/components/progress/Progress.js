import React from "react";
import "./Progress.css";

const { number } = require("prop-types");

const progress = (props) => (
  <div className="card-votes__progress-votes">
    {props.likePercentage >= 0 && (
      <div
        className="card-votes__progress-blue"
        style={{ width: props.likePercentage + "%" }}
      >
        <div className="card-votes__percentage">
          <img src={"assets/img/like.png"} alt="Postivo" />{" "}
          {props.likePercentage}%
        </div>
      </div>
    )}
    {props.dislikePercentage >= 0 && (
      <div
        className="card-votes__progress-yellow"
        style={{ width: props.dislikePercentage + "%" }}
      >
        <div className="card-votes__percentage">
          {props.dislikePercentage}%{" "}
          <img src={"assets/img/dislike.png"} alt="Negativo" />
        </div>
      </div>
    )}
  </div>
);

progress.propTypes = {
  likePercentage: number,
  dislikePercentage: number,
};

export default progress;
