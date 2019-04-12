import React, { Component } from "react";

import "./game.css";
import Board from "./board.jsx";
import PlayerDeck from "./playerDeck.jsx";
import ImageHeadline from "./dominoes-header.jpg"

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <h1>Dominoes <img src={ImageHeadline} /> Game!</h1>
        <h2>board:</h2><Board />
        <h2>Player deck:</h2><PlayerDeck />
      </div>
    );
  }
}

export default Game;
