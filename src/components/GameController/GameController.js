import React from "react";

import classes from "./GameController.module.css";
import Button from "../UI/Button/Button";

const GameController = props => {
  return (
    <div className={classes.GameController}>
      <Button
        clicked={props.hit}
        label={"Hit!"}
        active={props.isPlaying}
        type="hit"
      ></Button>

      <Button clicked={props.stick} label="Stick!" type="stick"></Button>
    </div>
  );
};

export default GameController;
