import React from "react";

import "./Cardgrid.css";
import "./Cardlist.css";

import IconHand from "../icon-thumb/IconThumb";
import "../icon-thumb/IconThumb.css";

import Button from "../button/button";
import Progress from "../progress/Progress";

const { string, number, func } = require("prop-types");

const Card = ({
  cardImageUrl,
  cardImageDescription,
  title,
  description,
  iconHandUrl,
  textDate,
  iconHandModifier,
  iconHandDescription,
  percentageLike,
  percentageDislike,
  vote,
  index,
}) => {
  const [dataVote, setDataVote] = React.useState({
    like: "",
    showButtonAgain: false,
  });

  const setVote = (type) => {
    setDataVote({ ...dataVote, like: type });
  };

  const handleButton = () => {
    vote(dataVote.like, index);
    setDataVote({ showButtonAgain: true, like: "" });
  };

  const handleAgain = () => {
    setDataVote({ showButtonAgain: false, like: "" });
  };

  return (
    <figure className="card-votes__container">
      <img
        src={"assets/img/" + cardImageUrl}
        alt={cardImageDescription}
        className="card-votes__image"
      />
      <IconHand
        url={iconHandUrl}
        description={iconHandDescription}
        modifier={iconHandModifier}
      />
      <figcaption className="card-votes__container-text">
        <div className="card-votes__text">
          <h2 className="card-votes__title">{title}</h2>
          <p className="card-votes__description">{description}</p>
        </div>
        <div className="card-votes__button-cont">
          <p className="card-votes__date">
            {dataVote.showButtonAgain ? "Thank you for your vote!" : textDate}
          </p>

          {!dataVote.showButtonAgain && (
            <>
              <input
                type="radio"
                id="contactChoice1"
                name="contact"
                value="email"
                className={`input-vote input-like ${
                  dataVote.like === "positive" ? "active" : ""
                }`}
                onClick={setVote.bind(this, "positive")}
              />
              <input
                type="radio"
                id="contactChoice2"
                name="contact"
                value="phone"
                className={`input-vote input-dislike ${
                  dataVote.like === "negative" ? "active" : ""
                }`}
                onClick={setVote.bind(this, "negative")}
              />
            </>
          )}
          {!dataVote.showButtonAgain && (
            <Button
              modifier="dark"
              text="Vote Now"
              type="button"
              aria-label="Vote"
              disabled={dataVote.like === ""}
              vote={handleButton}
            />
          )}
          {dataVote.showButtonAgain && (
            <Button
              modifier="dark"
              text="Vote Again"
              type="button"
              vote={handleAgain}
            />
          )}
        </div>
      </figcaption>
      <Progress
        dislikePercentage={percentageDislike}
        likePercentage={percentageLike}
      />
    </figure>
  );
};

Card.propTypes = {
  cardImageUrl: string,
  cardImageDescription: string,
  iconHandUrl: string,
  iconHandDescription: string,
  iconHandModifier: string,
  title: string,
  description: string,
  textDate: string,
  percentageDislike: number,
  percentageLike: number,
  index: number,
  vote: func,
};

export default Card;
