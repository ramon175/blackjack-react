import React from "react";

import classes from "./GameController.module.css";

const GameController = props => {
  return (
    <div className={classes.GameController}>
      <a
        // disabled={!props.isPlaying}
        onClick={props.hit}
        className={classes.Hit}
      >
        Hit!
      </a>

      <a onClick={props.stick} className={classes.Stick}>
        Stick!
      </a>
    </div>
  );
};

export default GameController;
