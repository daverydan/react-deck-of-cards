import React from "react";
import "./CardDeck.css";
import Card from "./Card";

const CardDeck = ({ cards }) => (
  <div className="CardDeck">
    {cards.map((card) => (
      <Card key={card.code} card={card} />
    ))}
  </div>
);

export default CardDeck;
