import React, { Component } from "react";

import './playerDeck.css';
import { Domino, Horizontal, Vertical } from "./domino/domino.jsx"

class PlayerDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getDominoes() {
    return (
      this.props.dominoes.map((domino, i) => (
        <td key={i}>
          <Domino direction={Horizontal} dots1={domino[0]} dots2={domino[1]} />
        </td>
      ))
    );
  }

  getInitialDeck() {
    return (
      <div className="player-deck">
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
    return (this.getInitialDeck());
  }
}

export default PlayerDeck;
