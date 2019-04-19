import React, { Component } from "react";

import './playerDeck.css';
import { Domino, Horizontal, Vertical } from "./domino/domino.jsx"

class PlayerDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onDragStart(ev, id) {
    ev.dataTransfer.setData("id", id);
  }

  getDominoes() {
    return (
      this.props.dominoes.map((domino) => (
        <td key={domino} onDragStart={(e) => this.onDragStart(e, domino)} draggable>
          <Domino direction={Horizontal} dots={domino} />
        </td>
      ))
    );
  }

  getDeck() {
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
    return (this.getDeck());
  }
}

export default PlayerDeck;
