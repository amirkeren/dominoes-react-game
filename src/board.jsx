import React, { Component } from "react";

import "./board.css";
import { Domino } from "./domino/domino.jsx"
import { Left } from "./domino/halfDomino.jsx";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getDominoes() {
    return (
      this.props.dominoes.map((domino) => (
          <Domino key={domino} direction={this.props.directions[domino] ? this.props.directions[domino] : Left} dots={domino} used={true}/>
      ))
    );
  }

  getBoard() {
    return (
      <div className="board">
        {this.getDominoes()}
      </div>
    );
  }

  render() {
    return (this.getBoard());
  }
}

export default Board;
