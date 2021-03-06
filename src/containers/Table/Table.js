import React, { Component } from "react";
import { shuffle, sum, countBy } from "lodash";

import classes from "./Table.module.css";
import GameController from "../../components/GameController/GameController";
import Hand from "../../components/Hand/Hand";
import Score from "../../components/Score/Score";
import Modal from "../../components/UI/Modal/Modal";
import Result from "../../components/Result/Result";
import Rules from "../../components/Rules/Rules";

//the idea is to have n tables playing the game simultaneously
const defaultDeck = [
  { suit: "diamonds", val: "A" },
  { suit: "diamonds", val: 2 },
  { suit: "diamonds", val: 3 },
  { suit: "diamonds", val: 4 },
  { suit: "diamonds", val: 5 },
  { suit: "diamonds", val: 6 },
  { suit: "diamonds", val: 7 },
  { suit: "diamonds", val: 8 },
  { suit: "diamonds", val: 9 },
  { suit: "diamonds", val: 10 },
  { suit: "diamonds", val: "J" },
  { suit: "diamonds", val: "Q" },
  { suit: "diamonds", val: "K" },
  { suit: "spades", val: "A" },
  { suit: "spades", val: 2 },
  { suit: "spades", val: 3 },
  { suit: "spades", val: 4 },
  { suit: "spades", val: 5 },
  { suit: "spades", val: 6 },
  { suit: "spades", val: 7 },
  { suit: "spades", val: 8 },
  { suit: "spades", val: 9 },
  { suit: "spades", val: 10 },
  { suit: "spades", val: "J" },
  { suit: "spades", val: "Q" },
  { suit: "spades", val: "K" },
  { suit: "clubs", val: "A" },
  { suit: "clubs", val: 2 },
  { suit: "clubs", val: 3 },
  { suit: "clubs", val: 4 },
  { suit: "clubs", val: 5 },
  { suit: "clubs", val: 6 },
  { suit: "clubs", val: 7 },
  { suit: "clubs", val: 8 },
  { suit: "clubs", val: 9 },
  { suit: "clubs", val: 10 },
  { suit: "clubs", val: "J" },
  { suit: "clubs", val: "Q" },
  { suit: "clubs", val: "K" },
  { suit: "hearts", val: "A" },
  { suit: "hearts", val: 2 },
  { suit: "hearts", val: 3 },
  { suit: "hearts", val: 4 },
  { suit: "hearts", val: 5 },
  { suit: "hearts", val: 6 },
  { suit: "hearts", val: 7 },
  { suit: "hearts", val: 8 },
  { suit: "hearts", val: 9 },
  { suit: "hearts", val: 10 },
  { suit: "hearts", val: "J" },
  { suit: "hearts", val: "Q" },
  { suit: "hearts", val: "K" }
];

export default class Table extends Component {
  getInitialState = replay => {
    const initialState = {
      deck: shuffle(defaultDeck),
      playerHand: [],
      dealerHand: [],
      playerScore: 0,
      dealerScore: 0,
      playing: true,
      showResult: false,
      result: "",
      showRules: replay ? false : true
    };

    initialState.playerHand.push(initialState.deck.pop());
    initialState.playerHand.push(initialState.deck.pop());

    initialState.dealerHand.push(initialState.deck.pop());

    if (replay) {
      initialState.playerScore = this.calculateScore(initialState.playerHand);
      initialState.dealerScore = this.calculateScore(initialState.dealerHand);
    }
    return initialState;
  };

  state = this.getInitialState();

  componentDidMount() {
    this.setState({ playerScore: this.calculateScore(this.state.playerHand) });
    this.setState({ dealerScore: this.calculateScore(this.state.dealerHand) });
  }

  calculateScore = hand => {
    let values = [];

    hand.forEach(card => {
      switch (card.val) {
        case "J":
          values.push(10);
          break;
        case "Q":
          values.push(10);
          break;
        case "K":
          values.push(10);
          break;
        case "A":
          values.push(11);
          break;
        default:
          values.push(card.val);
      }
    });

    let score = sum(values);

    if (score > 21) {
      let aces = countBy(hand, { val: "A" }).true;
      while (score > 21 && aces > 0) {
        score -= 10;
        aces -= 1;
      }
    }

    return score;
  };

  handleHit = () => {
    let newHand = this.state.playerHand;

    newHand.push(this.state.deck.pop());
    this.setState({ playerHand: newHand });
    let score = this.calculateScore(this.state.playerHand);
    if (score > 21) {
      this.setState({
        playing: false,
        playerScore: score,
        showResult: true,
        result: "You Lose :("
      });
    } else {
      this.setState({ playerScore: score });
    }
  };

  handleStick = () => {
    this.setState({ playing: false });

    let { dealerScore, playerScore, dealerHand } = this.state;

    while (dealerScore < playerScore) {
      dealerHand.push(this.state.deck.pop());

      dealerScore = this.calculateScore(dealerHand);
      this.setState({ dealerScore });
    }

    if (dealerScore > 21) {
      this.setState({ showResult: true, result: "You Win!" });
    } else {
      this.setState({ showResult: true, result: "You Lose!" });
    }
  };

  handleResultClose = () => {
    this.setState({ showResult: false });
  };

  handleRulesClose = () => {
    this.setState({ showRules: false });
  };

  handlePlayAgain = () => {
    this.setState(this.getInitialState(true));
  };

  render() {
    return (
      <div className={classes.Table}>
        <Modal show={this.state.showRules} modalClosed={this.handleRulesClose}>
          <Rules></Rules>
        </Modal>
        <Modal
          show={this.state.showResult}
          modalClosed={this.handleResultClose}
        >
          <Result
            result={this.state.result}
            playAgain={this.handlePlayAgain}
          ></Result>
        </Modal>
        <Score score={this.state.dealerScore}></Score>
        <Hand hand="Dealer Hand" cards={this.state.dealerHand}></Hand>
        <GameController
          hit={this.handleHit}
          isPlaying={this.state.playing}
          stick={this.handleStick}
        ></GameController>
        <Score player score={this.state.playerScore}></Score>
        <Hand hand="Your Hand" cards={this.state.playerHand}></Hand>
      </div>
    );
  }
}
