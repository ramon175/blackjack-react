import React from "react";

import classes from "./Card.module.css";

const Card = props => {
  return (
    <div className={[classes.Card, classes[`suit${props.suit}`]].join(" ")}>
      <p>{props.number}</p>
    </div>
  );
};

export default Card;
