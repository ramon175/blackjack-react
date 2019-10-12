import React from "react";
import Card from "./Card/Card";

const Hand = props => {
  return (
    <div>
      <p style={{ color: "white", textAlign: "center", marginBottom: "35px" }}>
        {props.hand}
      </p>
      {/* <Card number={} suit="spades"></Card> */}
      {props.cards.map(card => {
        return (
          <Card
            key={card.val + card.suit}
            number={card.val}
            suit={card.suit}
          ></Card>
        );
      })}
    </div>
  );
};

export default Hand;
