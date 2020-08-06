import React, { useState, useEffect } from "react";
import axios from "axios";
import "./GameBoard.css";
import ButtonClick from "./components/ButtonClick";
import CardDeck from "./CardDeck";

const GameBoard = () => {
  const [deckId, setDeckId] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    (async () =>
      await axios
        .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then((res) => setDeckId(res.data.deck_id)))();
  }, []);

  const generateStyles = () => {
    let posNeg = Math.floor(Math.random() * 2) === 1 ? 1 : -1; // + or -
    let num = (Math.floor(Math.random() * 44) + 1) * posNeg; // random degree
    let top = Math.floor(Math.random() * 25) * posNeg; // random top
    let left = Math.floor(Math.random() * 25) * posNeg; // random left
    return { left, top, transform: `rotate(${num}deg)` }; // styles
  };

  const drawCard = async () => {
    await axios
      .get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
      .then((res) => {
        res.data.cards[0].styles = generateStyles(); // + styles to card obj
        setCards([...cards, res.data.cards[0]]);
      })
      .catch((e) => alert("Error: no cards remaining!"));
  };

  return (
    <div className="GameBoard">
      <ButtonClick btnText="GIMME A CARD!" handleClick={drawCard} />
      <CardDeck cards={cards} />
    </div>
  );
};

export default GameBoard;
