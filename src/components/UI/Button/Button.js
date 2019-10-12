import React from "react";

import classes from "./Button.module.css";

const Button = props => {
  let attachedClasses = [classes.Button];

  let btnStyle = {
    background: "#288f3b",
    color: "#fff"
  };

  if (props.type === "stick") {
    btnStyle.background = "rgb(207, 74, 74)";
  }

  // switch (props.type) {
  //   case "hit":
  //     attachedClasses = [classes.Hit];
  //     break;
  //   case "stick":
  //     attachedClasses = [classes.Stick];
  //     break;
  //   default:
  //     attachedClasses = [classes.Hit];
  // }

  if (!props.active && props.type === "hit") {
    attachedClasses.push(classes.inactive);
  }

  return (
    <button
      onClick={props.clicked}
      className={attachedClasses.join(" ")}
      style={btnStyle}
    >
      {props.label}
    </button>
  );
};

export default Button;
