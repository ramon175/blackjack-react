import React from "react";

import classes from "./Score.module.css";

const Score = props => {
  return (
    <div className={classes.container}>
      <p className={classes.Score}>
        {props.player ? "Your" : "Dealer"} score: {props.score}
      </p>
    </div>
  );
};

export default Score;
