import React from "react";
import "./Card.css";

const Card = ({ card }) => (
  <img
    className="Card"
    src={card.image}
    alt={`${card.value} of ${card.suit}`}
    title={`${card.value} of ${card.suit}`}
    style={card.styles}
  />
);

export default Card;
