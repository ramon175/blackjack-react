import React from "react";

import classes from "./Result.module.css";

import Button from "../UI/Button/Button";

const Result = props => {
  return (
    <div className={classes.Result}>
      <h3>{props.result}</h3>
      <Button clicked={props.playAgain} label="Play Again"></Button>
    </div>
  );
};

export default Result;
