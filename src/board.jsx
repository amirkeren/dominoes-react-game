import React, { Component } from "react";

import "./board.css";
import { Domino } from "./domino/domino.jsx"

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getDominoes() {
    return (
      Object.keys(this.props.dominoes).map((domino) => (
          <Domino key={domino} domino={this.props.dominoes[domino]}/>
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