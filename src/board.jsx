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
        <td key={domino}>
          <Domino direction={Horizontal} dots={domino} />
        </td>
      ))
    );
  }

  getBoard() {
    return (
      <div className="board">
        <table>
          <tbody>
            <tr>
              {this.getDominoes()}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    return (this.getBoard());
  }
}

export default Board;
