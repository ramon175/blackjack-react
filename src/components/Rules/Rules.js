import React from "react";

import classes from "./Rules.module.css";

const Rules = props => {
  return (
    <div className={classes.Rules}>
      <h3 style={{ textAlign: "center" }}>Rules:</h3>

      <ul>
        <li>The player is given the following 2 options “hit” or “stick.”</li>
        <li>The player will “hit” until: </li>
        <ul>
          <li>
            They are happy with the sum of their cards and choose to “stick”
          </li>
          <li>
            The sum of their cards is over 21 and they will go bust and lose.
          </li>
        </ul>
        <li>If the player chooses to “sticks” it is now the dealer’s turn.</li>

        <li>
          The dealer will “hit” until they either have a closer total to 21 than
          the player or they go bust. (over 21)
        </li>
        <li>
          If the dealer goes over 21 then the player wins. if the dealer gets
          closer to 21 than the player without going over 21, the dealer wins.
        </li>
      </ul>
      <p style={{ textAlign: "center", fontWeight: "bold" }}>
        Click anywhere to begin!
      </p>
    </div>
  );
};

export default Rules;
