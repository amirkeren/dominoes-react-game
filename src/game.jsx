import React, { Component } from "react";

import "./game.css";
import Board from "./board.jsx";
import PlayerDeck from "./playerDeck.jsx";
import ImageHeadline from "./dominoes-header.jpg"

const PlayerInitialDominoesCount = 6;
const AllDominoes = [
  [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
  [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6],
  [2, 2], [2, 3], [2, 4], [2, 5], [2, 6],
  [3, 3], [3, 4], [3, 5], [3, 6],
  [4, 4], [4, 5], [4, 6],
  [5, 5], [5, 6],
  [6, 6]
];

class Game extends Component {
  constructor(props) {
    super(props);
    let randomPlayer1Dominoes = Array.from(
      { length: PlayerInitialDominoesCount },
      (v, i) => Math.floor(Math.random() * AllDominoes.length)
    );
    this.state = {
      player1Deck: AllDominoes.filter((item, i) => randomPlayer1Dominoes.includes(i)),
      bank: AllDominoes.filter((item, i) => !randomPlayer1Dominoes.includes(i)),
    };
  }

  render() {
    return (
      <div>
        <h1>Dominoes <img src={ImageHeadline} /> Game!</h1>
        <h2>board:</h2><Board />
        <h2>Player deck:</h2>
        <PlayerDeck dominoes={this.state.player1Deck} />
      </div>
    );
  }
}

export default Game;
