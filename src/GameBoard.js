import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./GameBoard.css";
import ButtonClick from "./components/ButtonClick";
import CardDeck from "./CardDeck";

const GameBoard = () => {
  const [deckId, setDeckId] = useState(null);
  const [cards, setCards] = useState([]);
  const [timerStatus, setTimerStatus] = useState(false);
  const timerId = useRef();

  useEffect(() => {
    newDeck();
    return stopTimer();
  }, []);

  const stopTimer = () => clearInterval(timerId.current);

  const newDeck = async () => {
    await axios
      .get("https://deckofcardsapi.com/api/deck/new/shuffle/")
      .then((res) => setDeckId(res.data.deck_id));
  };

  const drawCard = () => {
    if (timerStatus) {
      stopTimer();
      setTimerStatus(false);
    } else {
      setTimerStatus(true);
      timerId.current = setInterval(async () => {
        try {
          let res = await axios.get(
            `https://deckofcardsapi.com/api/deck/${deckId}/draw/`
          );
          if (res.data.remaining === 0) {
            stopTimer();
            setTimerStatus(false);
            throw new Error("no cards remaining!");
          }
          const card = res.data.cards[0];
          card.styles = generateStyles();
          setCards((c) => [...c, card]);
        } catch (error) {
          alert(error);
        }
      }, 1000);
    }
  };

  const generateStyles = () => {
    let posNeg = Math.floor(Math.random() * 2) === 1 ? 1 : -1; // + or -
    let num = (Math.floor(Math.random() * 44) + 1) * posNeg; // random degree
    let top = Math.floor(Math.random() * 25) * posNeg; // random top
    let left = Math.floor(Math.random() * 25) * posNeg; // random left
    return { left, top, transform: `rotate(${num}deg)` }; // styles
  };

  const getNewDeck = async () => {
    await setDeckId(null);
    await setCards([]);
    await stopTimer();
    await setTimerStatus(false);
    await newDeck();
  };

  return (
    <div className="GameBoard">
      <ButtonClick
        btnText={timerStatus ? "Stop Drawing" : "Start Drawing"}
        handleClick={drawCard}
      />
      <ButtonClick btnText="New Deck" handleClick={getNewDeck} />
      <CardDeck cards={cards} />
    </div>
  );
};

export default GameBoard;
