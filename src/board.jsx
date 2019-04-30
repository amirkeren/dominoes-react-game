import React, { Component } from "react";

import "./board.css";
import { Domino, Horizontal, Vertical } from "./domino/domino.jsx"

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getDominoes() {
    return (
      this.props.dominoes.map((domino) => (
          <Domino direction={Horizontal} dots={domino} />
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
