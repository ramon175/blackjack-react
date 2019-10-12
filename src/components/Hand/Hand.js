import React from "react";
import Card from "./Card/Card";

import classes from "./Hand.module.css";

const Hand = props => {
  return (
    <div className={classes.Hand}>
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
